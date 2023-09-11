import type { Meta, StoryObj } from '@storybook/react';
import BuyModal from 'components/modal/store/purchase/BuyModal';

const meta: Meta<typeof BuyModal> = {
  title: 'Modal/BuyModal',
  component: BuyModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BuyModal>;

export const Default: Story = {
  args: {
    itemId: 1,
    product: '프사 변경',
    price: 84,
  },
};
