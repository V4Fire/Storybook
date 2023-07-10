import type { PresetProperty, Options } from '@storybook/types';
import type { FrameworkOptions, StorybookConfig } from './types';
import HtmlWebpackStaticAssetsPlugin from './webpack/plugins/html-webpack-static-assets-plugin';

export const core: PresetProperty<'core', StorybookConfig> = {
  builder: '@storybook/builder-webpack5',
  renderer: '@v4fire/storybook',
};

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
  
  const {rootComponent, staticAssets} = frameworkOptions;
  const {prefix = '', scripts = [], styles = []} = staticAssets;
  
  config.plugins.push(
    // @ts-expect-error There is a mismatch between storybook webpack types and original types
    // but it doesn't affect the build
    new HtmlWebpackStaticAssetsPlugin({
      scripts: [
        ...scripts.map((src) => `${prefix}${src}`),
        `${prefix}lib/requestidlecallback.js`,
        `${prefix}lib/eventemitter2.js`,
        `${prefix}lib/vue.js`,
        `${prefix}std.js`,
        `${prefix}${rootComponent}_tpl.js`,
        `${prefix}${rootComponent}.js`,
      ].map((src) => `/${src}`),
      styles: [,
        ...styles.map((src) => `${prefix}${src}`),
        `${prefix}${rootComponent}_style.css`
      ].map((src) => `/${src}`),
    })
  );

  return config;
};
