import type { Meta, StoryObj } from '@storybook/react';
import WelcomeModal from 'components/modal/event/WelcomeModal';

const meta: Meta<typeof WelcomeModal> = {
  title: 'Modal/WelcomeModal',
  component: WelcomeModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WelcomeModal>;

export const Default: Story = {
  args: {},
};
