import type { Meta, StoryObj } from '@storybook/react';
import StoreManualModal from 'components/takgu/modal/store/StoreManualModal';

const meta: Meta<typeof StoreManualModal> = {
  title: 'Modal/StoreManualModal',
  component: StoreManualModal,
  tags: ['autodocs'],
  argTypes: {
    radioMode: ['COIN_POLICY', 'STORE_POLICY'],
  },
};

export default meta;
type Story = StoryObj<typeof StoreManualModal>;

export const BothMode: Story = {
  args: {
    radioMode: 'COIN_POLICY',
  },
};

export const NormalMode: Story = {
  args: {
    radioMode: 'STORE_POLICY',
  },
};
