import React from 'react';
import type { Preview } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { RecoilRoot } from 'recoil';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default preview;
