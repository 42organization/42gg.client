import type { Meta, StoryObj } from '@storybook/react';
import GiftModal from 'components/takgu/modal/store/purchase/GiftModal';

const meta: Meta<typeof GiftModal> = {
  title: 'PingPong/store/Modal/GiftModal',
  component: GiftModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GiftModal>;

export const Default: Story = {
  args: {
    itemId: 1,
    product: '프사 변경',
    price: 84,
  },
};
