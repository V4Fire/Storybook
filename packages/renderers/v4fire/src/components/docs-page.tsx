import type { FC } from 'react';
import React from 'react';
import {

  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  Markdown,
  useOf

} from '@storybook/blocks';

export const DocsPage: FC = () => {
  const resolvedOf = useOf('meta', ['meta']);
  const { stories } = resolvedOf.csfFile;
  const { readme } = resolvedOf.preparedMeta.parameters.docs ?? {};
  const isSingleStory = Object.keys(stories).length === 1;

  return (
    <>
      <Title />
      <Subtitle />
      <Description of="meta" />
      {isSingleStory ? <Description of="story" /> : null}
      <Primary />
      <Controls />
      {readme ? <Markdown>{readme.replace(/^\n*#.*\n/, '')}</Markdown> : null}
      {isSingleStory ? null : <Stories />}
    </>
  );
};
