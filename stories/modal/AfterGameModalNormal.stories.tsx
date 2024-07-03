import type { Meta, StoryObj } from '@storybook/react';
import NormalGame from 'components/takgu/modal/afterGame/NormalGame';

const meta: Meta<typeof NormalGame> = {
  title: 'Modal/AfterGameModalNormal',
  component: NormalGame,
  tags: ['autodocs'],
  argTypes: {
    currentGame: {
      gameId: Number,
      mode: ['NORMAL', 'RANK', 'BOTH'],
      startTime: String,
      isScoreExist: Boolean,
      status: ['WAIT', 'LIVE', 'END'],
      matchTeamsInfo: {
        myTeam: {
          teamScore: Number,
          teamId: Number,
          players: [
            {
              intraId: String,
              userImageUri: String,
              level: Number,
            },
          ],
        },
        enemyTeam: {
          teamScore: Number,
          teamId: Number,
          players: [
            {
              intraId: String,
              userImageUri: String,
              level: Number,
            },
          ],
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NormalGame>;

const gameInfo = {
  gameId: 1,
  mode: 'NORMAL' as const,
  startTime: '2022-07-13 11:50',
  isScoreExist: false,
  status: 'WAIT' as const,
  matchTeamsInfo: {
    myTeam: {
      teamScore: 1,
      teamId: 1,
      players: [
        {
          intraId: 'tak',
          userImageUri:
            'https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
          level: 1,
        },
      ],
    },
    enemyTeam: {
      teamScore: 1,
      teamId: 2,
      players: [
        {
          intraId: 'gu',
          userImageUri:
            'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          level: 1,
        },
      ],
    },
  },
};

const normalGameInfo = {
  ...gameInfo,
  isScoreExist: false,
};

export const NormalGameDefault: Story = {
  args: {
    currentGame: normalGameInfo,
  },
};
