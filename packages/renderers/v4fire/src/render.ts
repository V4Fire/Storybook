/* eslint-disable no-param-reassign */
import type { RenderContext, ArgsStoryFn } from '@storybook/types';
import type { V4FireRenderer } from './types';

export const render: ArgsStoryFn<V4FireRenderer> = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }

  // TODO: implement render
  return '';
};


export function renderToCanvas(
  { storyFn, forceRemount, showMain, showException, storyContext }: RenderContext<V4FireRenderer>,
  canvasElement: V4FireRenderer['canvasElement']
) {
  // TODO: implement render to canvas


  // TODO: return teardown function
  return () => {};
}