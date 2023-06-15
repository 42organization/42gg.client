import type { Meta, StoryObj } from '@storybook/react';
import StatChangeModal from 'components/modal/statChange/StatChangeModal';

const meta: Meta<typeof StatChangeModal> = {
  title: 'Modal/StatChangeModal',
  component: StatChangeModal,
  tags: ['autodocs'],
  argTypes: {
    gameId: Number,
    mode: ['RANK', 'NORMAL'],
  },
};

export default meta;
type Story = StoryObj<typeof StatChangeModal>;

export const Rank: Story = {
  args: {
    gameId: 2931,
    mode: 'RANK',
  },
};
