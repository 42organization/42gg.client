import type { Meta, StoryObj } from '@storybook/react';
import createAgenda from 'pages/agenda/create';

const meta: Meta = {
  title: 'Agenda/Form/create-agenda',
  component: createAgenda,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof createAgenda>;

export const DarkMode: Story = {
  args: {
    item: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontSize: 20,
    },
  },
};
