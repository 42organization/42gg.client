import type { Meta, StoryObj } from '@storybook/react';
import Megaphone from 'components/Layout/MegaPhone';

const meta: Meta<typeof Megaphone> = {
  title: 'Layout/Megaphone',
  component: Megaphone,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Megaphone>;

export const Default: Story = {
  args: {},
};
