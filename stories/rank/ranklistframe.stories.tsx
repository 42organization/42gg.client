import type { Meta, StoryObj } from '@storybook/react';
import RankListFrame from 'components/rank/RankListFrame';
import { ToggleMode } from 'types/rankTypes';

import * as ranklistitem from './ranklistitem.stories';

interface PageInfo {
  currentPage?: number;
  totalPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
interface RankListFrameProps {
  children: React.ReactNode;
  pageInfo: PageInfo;
  toggleMode: ToggleMode;
}

const meta: Meta<RankListFrameProps> = {
  title: 'RANK/RanklistFrame',
  component: RankListFrame,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<RankListFrameProps>;

export const Default: Story = {
  args: {
    toggleMode: 'RANK',
  },
};
