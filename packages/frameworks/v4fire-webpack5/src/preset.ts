import type { PresetProperty, Options, StoryIndexer } from '@storybook/types';
import type { Configuration } from 'webpack';

import type { FrameworkOptions, StorybookConfig } from './types';
import * as webpack from './webpack';
import { basename } from './utils';

export const core: PresetProperty<'core', StorybookConfig> = {
  builder: '@storybook/builder-webpack5',
  renderer: '@v4fire/storybook',
};

export const staticDirs: StorybookConfig['staticDirs'] = ['../dist/storybook'];

const defaultFrameworkOptions: FrameworkOptions = {
  rootComponent: 'p-v4-components-demo',
  staticAssets: {},
}

export const frameworkOptions = async (
  _: never,
  options: Options
): Promise<StorybookConfig['framework']> => {
  const config = await options.presets.apply<StorybookConfig['framework']>('framework');

  if (typeof config === 'string') {
    return {
      name: config,
      options: defaultFrameworkOptions,
    };
  }
  if (typeof config === 'undefined') {
    return {
      name: '@v4fire/storybook-framework-webpack5',
      options: defaultFrameworkOptions,
    };
  }

  return {
    name: config.name,
    options: {
      ...defaultFrameworkOptions,
      ...config.options,
    },
  };
};

export const webpackFinal: StorybookConfig['webpackFinal'] = async (config, options) => {
  const frameworkOptions: FrameworkOptions = (<any>options).frameworkOptions.options;
 
  config.target = 'web';
  webpack.applyModules(config as unknown as Configuration, frameworkOptions);
  webpack.applyPlugins(config as unknown as Configuration, frameworkOptions);

  return config;
};

export const storyIndexers = async (indexers?: StoryIndexer[]) => {
  const csfIndexer = indexers
    .find((indexer) => indexer.test.toString() === '/(stories|story)\\.[tj]sx?$/');
  
  if (csfIndexer) {
    // Override default csfIndexer to prevent duplicate errors.
    // This is useful for component story overriding in the child layers of the app.
    const cache = new Map<string, string>(); 
    const originalIndexer = csfIndexer.indexer;

    // It is expected that the final override will be passed to indexer first
    // i.e.: src/button.stories.js, node_modules/layer-1/button.stories.js
    // `src/button.stories.js` is the final override
    csfIndexer.indexer = async (fileName, opts) => {
      const name = basename(fileName);
      const existing = cache.get(name);

      if (existing != null && existing !== fileName) {
        return {
          meta: {},
          stories: []
        };
      }

      cache.set(name, fileName);
      return originalIndexer(fileName, opts);
    }
  } else {
    console.warn('Failed to patch `csfIndexer`. Story overrides will lead to duplicate errors.')
  }

  return indexers;
};