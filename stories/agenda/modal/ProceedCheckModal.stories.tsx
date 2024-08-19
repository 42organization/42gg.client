import type { Meta, StoryObj } from '@storybook/react';
import ProceedCheckModal from 'components/agenda/modal/ProceedCheckModal';

const meta: Meta = {
  title: 'Agenda/modal/proceedCheckModal',
  component: ProceedCheckModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProceedCheckModal>;

export const Default: Story = {
  args: {
    title: 'title',
    description: "modal's description",
    onProceed: () => {
      alert('proceed');
    },
    onCancel: () => {
      alert('cancel');
    },
  },
};
