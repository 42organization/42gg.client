import type { Meta, StoryObj } from '@storybook/react';
import SubmitAgendaResult from 'pages/agenda/detail/host/result';

const meta: Meta = {
  title: 'Agenda/Form/submit-agenda-result',
  component: SubmitAgendaResult,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SubmitAgendaResult>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};
