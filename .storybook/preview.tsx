import React from 'react';
import type { Preview } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'purple',
      values: [{ name: 'purple', value: '#301451' }],
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </RecoilRoot>
    ),
  ],
};

export default preview;
