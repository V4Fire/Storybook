import type {
  AnnotatedStoryFn,
  Args,
  ArgsFromMeta,
  ArgsStoryFn,
  ComponentAnnotations,
  DecoratorFunction,
  LoaderFunction,
  ProjectAnnotations,
  StoryAnnotations,
  StoryContext as GenericStoryContext,
  StrictArgs,
} from '@storybook/types';
import type { Constructor, SetOptional, Simplify } from 'type-fest';
import type { V4FireRenderer } from './types';

export type { Args, ArgTypes, Parameters, StrictArgs } from '@storybook/types';
export type { V4FireRenderer };

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<TCmpOrArgs = Args> = ComponentAnnotations<
  V4FireRenderer,
  ComponentProps<TCmpOrArgs>
>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryFn<TCmpOrArgs = Args> = AnnotatedStoryFn<
  V4FireRenderer,
  ComponentProps<TCmpOrArgs>
>;

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<TMetaOrCmpOrArgs = Args> = TMetaOrCmpOrArgs extends {
  render?: ArgsStoryFn<V4FireRenderer, any>;
  component?: infer Component;
  args?: infer DefaultArgs;
}
  ? Simplify<
      ComponentProps<Component> & ArgsFromMeta<V4FireRenderer, TMetaOrCmpOrArgs>
    > extends infer TArgs
    ? StoryAnnotations<
        V4FireRenderer,
        TArgs,
        SetOptional<TArgs, Extract<keyof TArgs, keyof DefaultArgs>>
      >
    : never
  : StoryAnnotations<V4FireRenderer, TMetaOrCmpOrArgs>;

// FIXME: currently it's impossible to extract prop types from the component
export type ComponentProps<C> = C extends Constructor<{ $props: infer P }> ? P : C; 

export type Decorator<TArgs = StrictArgs> = DecoratorFunction<V4FireRenderer, TArgs>;
export type Loader<TArgs = StrictArgs> = LoaderFunction<V4FireRenderer, TArgs>;
export type StoryContext<TArgs = StrictArgs> = GenericStoryContext<V4FireRenderer, TArgs>;
export type Preview = ProjectAnnotations<V4FireRenderer>;
