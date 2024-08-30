import type { Meta, StoryObj } from '@storybook/react';
import MatchCancelModal from 'components/takgu/modal/match/MatchCancelModal';

const meta: Meta<typeof MatchCancelModal> = {
  title: 'PingPong/Modal/MatchCancelModal',
  component: MatchCancelModal,
  tags: ['autodocs'],
  argTypes: {
    startTime: String,
  },
};

export default meta;
type Story = StoryObj<typeof MatchCancelModal>;

export const Default: Story = {
  args: {
    startTime: '2023-06-14T11:00',
  },
};
