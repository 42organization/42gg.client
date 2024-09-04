/** router 쿼리로 바꾸는 도중에 에러 떠서 모두 주석 처리 함 */

import type { Meta, StoryObj } from '@storybook/react';
import CreateTeam from 'pages/agenda/detail/team/create';

const meta: Meta = {
  title: 'Agenda/Form/create-team',
  component: CreateTeam,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateTeam>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};
