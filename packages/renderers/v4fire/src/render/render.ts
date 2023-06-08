/* eslint-disable no-param-reassign */
import type { RenderContext, ArgsStoryFn } from '@storybook/types';

import { app, ComponentInterface } from 'core/component';
import { render as renderVNode, create as createVNode, VNodeDescriptor } from 'components/friends/vdom';

import iBlock from 'components/super/i-block/i-block';
import { getComponentName } from 'core/component/reflect';

import type { V4FireRenderer } from '../types';

const render: ArgsStoryFn<V4FireRenderer, RenderComponentsVnodeParams> = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }
 
  const ctx = <Nullable<iBlock['unsafe']>>app.component;

	if (ctx == null) {
		throw new ReferenceError('The root context for rendering is not defined');
	}

	if (!(ctx.instance instanceof ComponentInterface) || !('vdom' in ctx)) {
		throw new TypeError('The root context does not implement the iBlock interface');
	}

  const componentName = getComponentName(Component);

  const descriptor: VNodeDescriptor = {
    type: componentName,
    ...props
  };

	const vNodes = createVNode.call(ctx.vdom, [descriptor]);

	const nodes = renderVNode.call(ctx.vdom, vNodes);

  return nodes[0];
};

export default render;
