import type { Meta, StoryObj } from '@storybook/react';
import User from 'pages/users/detail';

const meta: Meta<typeof User> = {
  title: 'PingPong/profile/Userprofile',
  component: User,
  tags: ['autodocs'],
  args: {
    intraId: String,
  },
};

export default meta;
type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {
    intraId: 'sangmipa',
  },
};
