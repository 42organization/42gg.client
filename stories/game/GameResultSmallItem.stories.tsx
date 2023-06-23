import type { Meta, StoryObj } from '@storybook/react';
import GameResultSmallItem from 'components/game/small/GameResultSmallItem';

const RANKTEAMS = {
  team1: {
    players: [
      {
        intraId: 'tak',
        userImageUri:
          'https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        level: 3,
        wins: 2,
        losses: 1,
      },
    ],
    isWin: true,
    score: 2,
  },
  team2: {
    players: [
      {
        intraId: 'gu',
        userImageUri:
          'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        level: 1,
        wins: 1,
        losses: 2,
      },
    ],
    isWin: false,
    score: 1,
  },
};

const meta: Meta<typeof GameResultSmallItem> = {
  title: 'Game/GameResultSmallItem',
  component: GameResultSmallItem,
  tags: ['autodocs'],
  argTypes: {
    type: ['LIGHT', 'DARK'],
    radioMode: ['NORMAL', 'RANK', 'BOTH'],
    zIndexList: Boolean,
  },
  args: {
    game: {
      gameId: 1,
      status: 'LIVE' as const,
      mode: 'RANK' as const,
      time: '2023-6-19T15:00:00.000Z',
      ...RANKTEAMS,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GameResultSmallItem>;

export const BothLight: Story = {
  args: {
    type: 'LIGHT',
    radioMode: 'BOTH',
    zIndexList: false,
  },
};

export const BothDark: Story = {
  args: {
    type: 'DARK',
    radioMode: 'BOTH',
    zIndexList: false,
  },
};

export const RankLight: Story = {
  args: {
    type: 'LIGHT',
    radioMode: 'RANK',
    zIndexList: false,
  },
};

export const RankDark: Story = {
  args: {
    type: 'DARK',
    radioMode: 'RANK',
    zIndexList: false,
  },
};

export const NormalLight: Story = {
  args: {
    type: 'LIGHT',
    radioMode: 'NORMAL',
    zIndexList: false,
  },
};

export const NormalDark: Story = {
  args: {
    type: 'DARK',
    radioMode: 'NORMAL',
    zIndexList: false,
  },
};
