import type { Meta, StoryObj } from '@storybook/react';
import agendaHome from 'pages/agenda/index';

const meta: Meta = {
  title: 'Agenda/home',
  component: agendaHome,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof agendaHome>;

export const Default: Story = {
  args: {},
};
