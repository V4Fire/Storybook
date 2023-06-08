import type { StoryContext as StoryContextBase, WebRenderer } from '@storybook/types';
import { Constructor } from 'type-fest';

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnV4FireReturnType = Node;

export type StoryContext = StoryContextBase<V4FireRenderer>;

export interface V4FireRenderer extends WebRenderer {
  // FIXME: use ComponentInterface, but it can't be built now due to TS4023, TS2527 errors
  // at @v4fire/client/src/core/component/engines/vue3/render.ts(110,2)
  component: Constructor<{ $props: any }>;
  storyResult: StoryFnV4FireReturnType;
}
