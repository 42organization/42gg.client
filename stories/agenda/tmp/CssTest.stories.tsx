import type { Meta, StoryObj } from '@storybook/react';
import CssTest from 'components/tmp/CssTest';

const meta: Meta = {
  title: 'Agenda/csstest',
  component: CssTest,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CssTest>;

export const DarkMode: Story = {
  args: {
    item: {},
  },
};
