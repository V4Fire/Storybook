import { Configuration } from 'webpack';
import { FrameworkOptions } from '../../types';
import HtmlWebpackStaticAssetsPlugin from './html-webpack-static-assets-plugin';

export default function applyPlugins(config: Configuration, options: FrameworkOptions): void {
  const {rootComponent, staticAssets} = options;
  const {prefix = '', scripts = [], styles = []} = staticAssets;

  // Now only relative paths are supported,
  // TODO: implement support for the absolute paths
  config.plugins.push(
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

}