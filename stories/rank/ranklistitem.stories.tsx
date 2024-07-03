import type { Meta, StoryObj } from '@storybook/react';
import { RankListItem } from 'components/takgu/rank/RankListItem';
const meta: Meta = {
  title: 'rank/RankListItem',
  component: RankListItem,
};

export default meta;
type Story = StoryObj<typeof RankListItem>;

export const Default: Story = {
  args: {
    user: {
      rank: 1,
      intraId: 'kim_takgu',
      statusMessage: '나는야 탁구왕 김탁구',
      ppp: 1,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      textColor: '#FFFFFF',
    },
  },
};
