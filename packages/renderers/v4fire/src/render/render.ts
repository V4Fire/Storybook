/* eslint-disable no-param-reassign */
import type { ArgsStoryFn } from '@storybook/types';
import type { V4FireRenderer } from '../types';

const isSlotRegex = /^slot:(.*)$/;

const render: ArgsStoryFn<V4FireRenderer, Dictionary<any>> = (props, context) => {
  const { id, component: componentOrName } = context;
  if (!componentOrName) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }

  const {children = {}, ...attrs} = props;

  if (Object.isPlainObject(children)) {
    Object.entries(attrs).forEach(([key, value]) => {
      const matches = key.match(isSlotRegex);

      if (matches) {
        const slotName = matches[1];
        children[slotName] = value;
      }
    });
  }

  // TODO: in future component may be passed as the class
  globalThis.renderComponents(
    componentOrName,
    [{attrs, children: <RenderComponentsVnodeParams['children']>children}]
  );
};

export default render;
