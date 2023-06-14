import type { Meta, StoryObj } from '@storybook/react';
import MatchEnrollModal from 'components/modal/match/MatchEnrollModal';

const meta: Meta<typeof MatchEnrollModal> = {
  title: 'Modal/MatchEnrollModal',
  component: MatchEnrollModal,
  tags: ['autodocs'],
  argTypes: {
    startTime: String,
    endTime: String,
    mode: String,
  },
};

export default meta;
type Story = StoryObj<typeof MatchEnrollModal>;

export const BOTH: Story = {
  args: {
    startTime: '2023-06-14T15:00',
    endTime: '2023-06-14T15:15',
    mode: 'BOTH',
  },
};
export const RANK: Story = {
  args: {
    startTime: '2023-06-14T00:45',
    endTime: '2023-06-14T01:00',
    mode: 'RANK',
  },
};
export const NORMAL: Story = {
  args: {
    startTime: '2023-06-22T12:30',
    endTime: '2023-06-22T12:45',
    mode: 'NORMAL',
  },
};
