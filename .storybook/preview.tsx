import React from 'react';
import type { Preview } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import '../styles/globals.css';

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
      default: 'light-bg',
      values: [
        { name: 'purple', value: '#301451' },
        {
          name: 'light-bg',
          value: 'linear-gradient(180deg, #c9c9c9 0%, #6d5b93 100%)',
        },
        {
          name: 'dark-bg',
          value: 'linear-gradient(180deg, #6d5b93 0%, #301451 100%)',
        },
      ],
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
