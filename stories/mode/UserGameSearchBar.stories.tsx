import type { Meta, StoryObj } from '@storybook/react';
import UserGameSearchBar from 'components/mode/modeItems/UserGameSearchBar';

const meta: Meta<typeof UserGameSearchBar> = {
  title: 'Mode/UserGameSearchBar',
  component: UserGameSearchBar,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserGameSearchBar>;

export const Default: Story = {};
