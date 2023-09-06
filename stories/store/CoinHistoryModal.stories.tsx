import type { Meta, StoryObj } from '@storybook/react';
import UserCoinHistoryModal from 'components/modal/store/UserCoinHistoryModal';

const meta: Meta<typeof UserCoinHistoryModal> = {
  title: 'Modal/UserCoinHistoryModal',
  component: UserCoinHistoryModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserCoinHistoryModal>;

export const Default: Story = {
  args: {
    coin: 100,
  },
};
