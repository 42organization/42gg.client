import type { Meta, StoryObj } from '@storybook/react';
import GiftModal from 'components/modal/store/purchase/GiftModal';

const meta: Meta<typeof GiftModal> = {
  title: 'Modal/GiftModal',
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
