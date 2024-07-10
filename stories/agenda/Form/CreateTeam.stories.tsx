import type { Meta, StoryObj } from '@storybook/react';
import CreateTeam from 'pages/agenda/[agendaKey]/[teamUID]/create-team';

const meta: Meta = {
  title: 'Agenda/Form',
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
