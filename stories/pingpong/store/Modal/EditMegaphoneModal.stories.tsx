import type { Meta, StoryObj } from '@storybook/react';
import EditMegaphoneModal from 'components/modal/store/inventory/EditMegaphoneModal';

const meta: Meta<typeof EditMegaphoneModal> = {
  title: 'PingPong/store/Modal/EditMegaphoneModal',
  component: EditMegaphoneModal,
  tags: ['autodocs'],
  argTypes: { receiptId: { control: { type: 'number' } } },
};

export default meta;
type Story = StoryObj<typeof EditMegaphoneModal>;

export const Default: Story = {
  args: { receiptId: 1 },
};
