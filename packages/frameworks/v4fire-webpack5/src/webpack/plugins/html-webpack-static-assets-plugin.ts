import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Compilation, Compiler, WebpackPluginInstance } from 'webpack';

interface Options {
  scripts: string[];
  styles: string[];
}

export default class HtmlWebpackStaticAssetsPlugin implements WebpackPluginInstance {
  htmlPluginName: string;
  htmlPluginConstructorName: string;
  options: Options;

  constructor(options: Options) {
    this.options = options;
    this.htmlPluginName = 'html-webpack-plugin';
    this.htmlPluginConstructorName = 'HtmlWebpackPlugin';
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('htmlWebpackStaticAssetsPlugin', createOnCompile.call(this));
  }
}


function createOnCompile(this: HtmlWebpackStaticAssetsPlugin) {
  return (compilation: Compilation) => {
    const Plugin: typeof HtmlWebpackPlugin = require(this.htmlPluginName);

    if (!Plugin.getHooks) {
      throw new Error(`Package "${this.htmlPluginName}" doesn't have "getHooks" function`);
    }

    const htmlPlugins = compilation.options.plugins
      .filter(plugin => plugin.constructor?.name === this.htmlPluginConstructorName);

    if (htmlPlugins.length === 0) {
      throw new Error(`${this.htmlPluginName} is missing in your webpack config's plugins`);
    }

    const hooks = Plugin.getHooks(compilation);

    hooks.beforeEmit.tapAsync(
      'htmlWebpackStaticAssetsPlugin',
      createOnBeforeEmit.call(this)
    );
  }
}

function createOnBeforeEmit(this: HtmlWebpackStaticAssetsPlugin) {
  return (data: any, done: (error: unknown, result: any) => void) => {
    data.html = data.html.replace('<head>', [
      '<head>',
      ...this.options.scripts.map((src) => `<script src="${src}"></script>`),
      ...this.options.styles.map((href) => `<link href="${href}" rel="stylesheet" />`),
    ].join('\n'));

    done(null, data); 
  }
}