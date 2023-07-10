import type { StorybookConfig as StorybookConfigBase } from '@storybook/types';
import type {
  StorybookConfigWebpack,
  BuilderOptions,
} from '@storybook/builder-webpack5';

type FrameworkName = '@v4fire/storybook-framework-webpack5';
type BuilderName = '@storybook/builder-webpack5';

export type FrameworkOptions = {
  builder?: BuilderOptions;

  /**
   * Root component which will be used to render the stories, i.e.: `p-v4-components-demo`
   */
  rootComponent: string;

  staticAssets: {
    /**
     * Prefix for the assets, i.e.: `desktop_`
     */    
    prefix?: string;

    /**
     * Relative source links for additional scripts to add
     * 
     * @example
     * ```js
     * ['lodash.js']
     * ```
     */
    scripts?: string[];

    /**
     * Relative source links for additional styles to add
     * 
     * @example
     * ```js
     * ['normalize.css']
     * ```
     */
    styles?: string[];
  }
};

type StorybookConfigFramework = {
  framework:
    | FrameworkName
    | {
        name: FrameworkName;
        options: FrameworkOptions;
      };
  core?: StorybookConfigBase['core'] & {
    builder?:
      | BuilderName
      | {
          name: BuilderName;
          options: BuilderOptions;
        };
  };
};

/**
 * The interface for Storybook configuration in `main.ts` files.
 */
export type StorybookConfig = Omit<
  StorybookConfigBase,
  keyof StorybookConfigWebpack | keyof StorybookConfigFramework
> &
  StorybookConfigWebpack &
  StorybookConfigFramework;