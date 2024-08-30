import type { Meta, StoryObj } from '@storybook/react';
import { NormalListItem } from 'components/takgu/rank/NormalListItem';
const meta: Meta = {
  title: 'PingPong/rank/NormalListItem',
  component: NormalListItem,
};

export default meta;
type Story = StoryObj<typeof NormalListItem>;

export const Default: Story = {
  args: {
    user: {
      rank: 1,
      intraId: 'kim_takgu',
      statusMessage: '나는야 탁구왕 김탁구',
      exp: 1,
      level: 1,
      textColor: '#FFFFFF',
    },
  },
};
