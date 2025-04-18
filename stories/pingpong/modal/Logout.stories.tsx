import type { Meta, StoryObj } from '@storybook/react';
import LogoutModal from 'components/takgu/modal/menu/LogoutModal';

const meta: Meta<typeof LogoutModal> = {
  title: 'PingPong/Modal/LogoutModal',
  component: LogoutModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LogoutModal>;

export const Default: Story = {
  args: {},
};
