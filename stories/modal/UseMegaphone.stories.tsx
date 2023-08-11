import type { Meta, StoryObj } from '@storybook/react';
import UseMegaphone from 'components/modal/store/inventory/UseMegaphone';

const meta: Meta<typeof UseMegaphone> = {
  title: 'Modal/UseMegaphone',
  component: UseMegaphone,
  tags: ['autodocs'],
  argTypes: { receiptId: { control: { type: 'number' } } },
};

export default meta;
type Story = StoryObj<typeof UseMegaphone>;

export const Default: Story = {
  args: { receiptId: 1 },
};
