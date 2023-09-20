import type { Meta, StoryObj } from '@storybook/react';
import ChangeProfileEdgeModal from 'components/modal/store/inventory/ChangeProfileEdgeModal';

const meta: Meta<typeof ChangeProfileEdgeModal> = {
  title: 'store/Modal/ChangeProfileEdgeModal',
  component: ChangeProfileEdgeModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ChangeProfileEdgeModal>;

export const Default: Story = {
  args: {
    receiptId: 4,
  },
};
