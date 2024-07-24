import type { Meta, StoryObj } from '@storybook/react';
import CreateAgenda from 'pages/agenda/create';

const meta: Meta = {
  title: 'Agenda/Form/create-agenda',
  component: CreateAgenda,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateAgenda>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};
