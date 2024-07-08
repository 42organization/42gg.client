import type { Meta, StoryObj } from '@storybook/react';
import ReportModal from 'components/takgu/modal/menu/ReportModal';

const meta: Meta<typeof ReportModal> = {
  title: 'PingPong/Modal/ReportModal',
  component: ReportModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ReportModal>;

export const Default: Story = {
  args: {},
};
