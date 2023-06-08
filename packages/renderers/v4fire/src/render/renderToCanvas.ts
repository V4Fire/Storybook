import { RenderContext } from '@storybook/types'

import { V4FireRenderer } from '../types';

export default function renderToCanvas(
  { storyFn, forceRemount, showMain, showException, storyContext }: RenderContext<V4FireRenderer>,
  canvasElement: V4FireRenderer['canvasElement']
) {  
  // TODO: implement render to canvas
  console.log('RENDER TO CANVAS', storyFn());

  if (forceRemount) {
    // TODO: remove element
  }

  // TODO: render

  // TODO: return teardown function
  return () => {};
}