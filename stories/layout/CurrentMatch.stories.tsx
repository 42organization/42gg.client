import type { Meta, StoryObj } from '@storybook/react';
import { CurrentMatchContent } from 'components/Layout/CurrentMatch';

const meta: Meta<typeof CurrentMatchContent> = {
  title: 'Layout/CurrentMatch',
  component: CurrentMatchContent,
  tags: ['autodocs'],
  argTypes: {
    currentMatch: {
      startTime: String,
      endTime: String,
      isMatched: Boolean,
      myTeam: ['Storybook'],
      enemyTeam: ['Cypress'],
      isImminent: Boolean,
    },
    index: Number,
  },
};

const testMatch = [
  {
    startTime: '2023-08-02T10:00',
    endTime: '2023-08-02T10:15',
    isMatched: true,
    myTeam: ['Storybook'],
    enemyTeam: ['Cypress'],
    isImminent: false,
  },
  {
    startTime: '2023-01-02T10:00',
    endTime: '2023-01-02T10:00',
    isMatched: true,
    myTeam: ['Storybook'],
    enemyTeam: ['Cypress'],
    isImminent: true,
  },
  {
    startTime: '2023-01-02T10:00',
    endTime: '2023-01-02T10:00',
    isMatched: false,
    myTeam: ['Storybook'],
    enemyTeam: [],
    isImminent: false,
  },
];

export default meta;
type Story = StoryObj<typeof CurrentMatchContent>;

export const Matched: Story = {
  args: {
    currentMatch: testMatch[0],
    index: 0,
  },
};

export const Imminent: Story = {
  args: {
    currentMatch: testMatch[1],
    index: 0,
  },
};

export const Wait: Story = {
  args: {
    currentMatch: testMatch[2],
    index: 0,
  },
};
