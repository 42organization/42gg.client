import type { Meta, StoryObj } from '@storybook/react';
import TMP from 'components/tmp/TMP';

const meta: Meta = {
  title: 'Agenda/tmp',
  component: TMP,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TMP>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};

export const WhiteMode: Story = {
  args: {
    item: {
      color: '#000000',
      backgroundColor: '#ffffff',
      fontSize: 20,
    },
  },
};
