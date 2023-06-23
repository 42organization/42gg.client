import type { Meta, StoryObj } from '@storybook/react';
import MatchManualModal from 'components/modal/match/MatchManualModal';

const meta: Meta<typeof MatchManualModal> = {
  title: 'Modal/MatchManualModal',
  component: MatchManualModal,
  tags: ['autodocs'],
  argTypes: {
    radioMode: ['BOTH', 'NORMAL', 'RANK'],
  },
};

export default meta;
type Story = StoryObj<typeof MatchManualModal>;

export const BothMode: Story = {
  args: {
    radioMode: 'BOTH',
  },
};

export const NormalMode: Story = {
  args: {
    radioMode: 'NORMAL',
  },
};

export const RankMode: Story = {
  args: {
    radioMode: 'RANK',
  },
};
