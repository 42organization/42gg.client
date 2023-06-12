import type { Meta, StoryObj } from '@storybook/react';
import ModeRadiobox from 'components/mode/modeItems/ModeRadiobox';

const meta: Meta<typeof ModeRadiobox> = {
  title: 'Game/ModeRadiobox',
  component: ModeRadiobox,
  tags: ['autodocs'],
  argTypes: {
    mode: ['BOTH', 'NORMAL', 'RANK'],
    zIndexList: Boolean,
  },
};

export default meta;
type Story = StoryObj<typeof ModeRadiobox>;

export const Both: Story = {
  args: {
    mode: 'BOTH',
    zIndexList: false,
  },
};

export const Normal: Story = {
  args: {
    mode: 'NORMAL',
    zIndexList: false,
  },
};

export const Rank: Story = {
  args: {
    mode: 'RANK',
    zIndexList: false,
  },
};
