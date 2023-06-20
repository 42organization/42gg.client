import type { Meta, StoryObj } from '@storybook/react';
import MatchRejectModal from 'components/modal/match/MatchRejectModal';

const meta: Meta<typeof MatchRejectModal> = {
  title: 'Modal/MatchRejectModal',
  component: MatchRejectModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MatchRejectModal>;

export const Default: Story = {
  args: {},
};
