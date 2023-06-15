import type { Meta, StoryObj } from '@storybook/react';
import RankListMain, {
  RankListMainProps,
} from 'components/rank/topRank/RankListMain';

const meta: Meta<RankListMainProps> = {
  title: 'RANK/RanklistMain',
  component: RankListMain,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<RankListMainProps>;

export const Default: Story = {
  args: {
    rank: {
      myRank: 150,
      currentPage: 1,
      totalPage: 20,
      rankList: [],
    },
  },
};

export const NonDataRanker: Story = {
  args: {
    rank: {
      myRank: 150,
      currentPage: 1,
      totalPage: 20,
      rankList: [
        {
          rank: 2,
          intraId: 'user1',
          statusMessage: 'Hello',
          ppp: 100,
          userImageUri: 'image1.png',
        },
        {
          rank: 1,
          intraId: 'user2',
          statusMessage: 'Hi',
          ppp: 90,
          userImageUri: 'image2.png',
        },
      ],
    },
  },
};
