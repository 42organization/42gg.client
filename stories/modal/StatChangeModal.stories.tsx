import type { Meta, StoryObj } from '@storybook/react';
import ExpStat from 'components/modal/statChange/ExpStat';
import PppStat from 'components/modal/statChange/PppStat';
import StatChangeModal from 'components/modal/statChange/StatChangeModal';

const meta: Meta<typeof PppStat> = {
  title: 'Modal/PppStat',
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

// const DefaultModal = () => {
//   const stat = {
//     beforeExp: 100,
//     beforeMaxExp: 200,
//     beforeLevel: 1,
//     increasedExp: 150,
//     increasedLevel: 1,
//     afterMaxExp: 300,
//     changedPpp: 32,
//     beforePpp: 1021,
//   }
//   return ( <PppStat stat={stat} />)
// }

// export const Rank: Story = {
//   render: () => <DefaultModal />
// }

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
