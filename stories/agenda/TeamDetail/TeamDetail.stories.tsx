import type { Meta, StoryObj } from '@storybook/react';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';

const meta: Meta = {
  title: 'Agenda/TeamDetail/team-info',
  component: TeamInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamInfo>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};
