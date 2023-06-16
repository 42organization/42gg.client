import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ToggleMode } from 'types/rankTypes';
import RankList from 'components/rank/RankList';
import useRankList from 'hooks/rank/useRankList';
import { Rank } from 'types/rankTypes';

import * as ranklistTrophy from './ranklisttrophy.stories';

interface RankListProps {
  toggleMode: ToggleMode;
  season?: number;
  isMain?: boolean;
}
const meta: Meta<RankListProps> = {
  title: 'RANK/Ranklist',
  component: RankList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<RankListProps>;

export const Default: Story = {
  args: {
    toggleMode: 'NORMAL',
    season: 4,
    isMain: true,
  },
};

export const normalmode: Story = {
  args: {
    toggleMode: 'NORMAL',
    season: 4,
    isMain: true,
  },
};
