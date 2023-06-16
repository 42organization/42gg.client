import type { Meta, StoryObj } from '@storybook/react';
import { MenuTop } from 'components/Layout/MenuBar/MenuBar';

const meta: Meta<typeof MenuTop> = {
  title: 'Header/MenuTop',
  component: MenuTop,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MenuTop>;

export const Default: Story = {
  args: {},
};
