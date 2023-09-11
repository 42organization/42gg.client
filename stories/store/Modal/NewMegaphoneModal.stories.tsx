import type { Meta, StoryObj } from '@storybook/react';
import NewMegaphoneModal from 'components/modal/store/inventory/NewMegaphoneModal';

const meta: Meta<typeof NewMegaphoneModal> = {
  title: 'store/Modal/NewMegaphoneModal',
  component: NewMegaphoneModal,
  tags: ['autodocs'],
  argTypes: { receiptId: { control: { type: 'number' } } },
};

export default meta;
type Story = StoryObj<typeof NewMegaphoneModal>;

export const Default: Story = {
  args: { receiptId: 1 },
};
