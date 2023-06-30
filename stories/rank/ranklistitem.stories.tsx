import type { Meta, StoryObj } from '@storybook/react';
import { ToggleMode } from 'types/rankTypes';
import RankListItem from 'components/rank/RankListItem';

interface User {
  intraId: string;
  rank: number;
  statusMessage: string;
  point: number | string;
  level: number | null;
}

interface RankListItemProps {
  user: User;
  toggleMode: ToggleMode;
}

const meta: Meta<RankListItemProps> = {
  title: 'RANK/ranklistItem',
  component: RankListItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<RankListItemProps>;

export const Default: Story = {
  args: {
    user: {
      intraId: 'sansdf',
      rank: 1,
      statusMessage: 'sadfsadfjhkjggkjggjgjhggk',
      point: 100,
      level: 5,
    },
  },
};
