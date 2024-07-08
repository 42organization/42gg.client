import type { Meta, StoryObj } from '@storybook/react';
import Megaphone from 'components/takgu/Layout/MegaPhone';

const meta: Meta<typeof Megaphone> = {
  title: 'PingPong/Layout/Megaphone',
  component: Megaphone,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Megaphone>;

export const Default: Story = {
  args: {},
};
