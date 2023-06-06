import type { PresetProperty } from '@storybook/types';
import type { StorybookConfig } from './types';

export const core: PresetProperty<'core', StorybookConfig> = {
  builder: '@storybook/builder-webpack5',
  renderer: '@v4fire/storybook',
};

export const webpackFinal: StorybookConfig['webpackFinal'] = async (config) => {
  // TODO: apply custom config rules
  return config;
};
