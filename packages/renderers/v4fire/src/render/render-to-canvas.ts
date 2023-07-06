/* eslint-disable no-param-reassign */
import type { RenderContext } from '@storybook/types';
import type { V4FireRenderer } from '../types';

export default async function renderToCanvas(
  { storyFn, forceRemount, showMain, showException, storyContext }: RenderContext<V4FireRenderer>,
  canvasElement: V4FireRenderer['canvasElement']
) {
  // TODO: handle remounts and re-renders correctly
  await globalThis.v4fireStorybook.initApp(canvasElement);

  storyFn(); 
  showMain();

  // TODO: return teardown function
  return () => {};
}