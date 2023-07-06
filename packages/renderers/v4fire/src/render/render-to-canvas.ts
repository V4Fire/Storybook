/* eslint-disable no-param-reassign */
import type { RenderContext } from '@storybook/types';
import type { V4FireRenderer } from '../types';
import type { App } from '@v4fire/client/core/component';

const map = new Map<V4FireRenderer['canvasElement'], App>();

export default async function renderToCanvas(
  { storyFn, showMain, showException }: RenderContext<V4FireRenderer>,
  canvasElement: V4FireRenderer['canvasElement']
) {
  const existingApp = map.get(canvasElement);

  if (existingApp) {
    teardown(existingApp, canvasElement);
    globalThis.removeCreatedComponents();
  }

  const app = await globalThis.v4fireStorybook.initApp(canvasElement);
  map.set(canvasElement, app);

  if (app.context) {
    app.context.config.errorHandler = (e: unknown) => showException(e as Error);
  }

  storyFn();
  showMain();

  return () => {
    teardown(app, canvasElement);
  };
}

function teardown(
  app: App,
  canvasElement: V4FireRenderer['canvasElement']
) {
  app.context?.unmount();
  map.delete(canvasElement);
}