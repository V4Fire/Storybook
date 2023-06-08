import type { App } from 'core/component/engines';
import { V4FireRenderer, StoryFnV4FireReturnType } from '../types';

export const canvasToApp = new Map<
  V4FireRenderer['canvasElement'],
  { app: App }
>();

export const canvasToVNode = new Map<V4FireRenderer['canvasElement'], StoryFnV4FireReturnType>();
