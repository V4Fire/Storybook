# Storybook for V4Fire <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [In a project without Storybook](#in-a-project-without-storybook)

## Requirements

- [V4Fire](https://github.com/V4Fire/Client) >= 4.x
- [Storybook](https://storybook.js.org/) >= 7.x
- Node.js >= 18

## Getting Started

### In a project without Storybook

Follow the prompts after running this command in your V4Fire project's root directory:

```bash
npx storybook@7.0.23 init --type html
yarn remove @storybook/html @storybook/html-webpack5
yarn add -E -D @v4fire/storybook-framework-webpack5 @v4fire/storybook
```

Change all versions to exact in `package.json`.

Check `.storybook` directory, change language of underlying files to javascript if needed.

Rename `.babelrc.json` to `babel.config.js`, and change it's contents to:

```js
'use strict';

module.exports = {
	sourceType: 'unambiguous',
	presets: [
		['@babel/preset-typescript'],
		['@babel/preset-env']
	]
};
```

[More on getting started with Storybook](https://storybook.js.org/docs/react/get-started/install)
