import type { Meta, StoryObj } from '@storybook/react';
import PppStat from 'components/takgu/modal/statChange/PppStat';

const meta: Meta<typeof PppStat> = {
  title: 'PingPong/Modal/PppStat',
  component: PppStat,
  tags: ['autodocs'],
  argTypes: {
    stat: {
      beforeExp: Number,
      beforeMaxExp: Number,
      beforeLevel: Number,
      increasedExp: Number,
      increasedLevel: Number,
      afterMaxExp: Number,
      changedPpp: Number,
      beforePpp: Number,
    },
  },
};

export default meta;
type Story = StoryObj<typeof PppStat>;

export const Default: Story = {
  args: {
    stat: {
      beforeExp: 100,
      beforeMaxExp: 200,
      beforeLevel: 1,
      increasedExp: 150,
      increasedLevel: 1,
      afterMaxExp: 300,
      changedPpp: 32,
      beforePpp: 1021,
    },
  },
};
