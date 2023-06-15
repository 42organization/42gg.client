import type { Meta, StoryObj } from '@storybook/react';
import ModeRadiobox from 'components/mode/modeItems/ModeRadiobox';

const meta: Meta<typeof ModeRadiobox> = {
  title: 'Game/ModeRadiobox',
  component: ModeRadiobox,
  tags: ['autodocs'],
  argTypes: {
    mode: ['BOTH', 'NORMAL', 'RANK'],
    page: ['GAME', 'MATCH', 'MANUAL'],
    zIndexList: Boolean,
  },
};

export default meta;
type Story = StoryObj<typeof ModeRadiobox>;

export const GameRadio: Story = {
  args: {
    mode: 'BOTH',
    page: 'GAME',
    zIndexList: false,
  },
};

export const MatchRadio: Story = {
  args: {
    mode: 'BOTH',
    page: 'MATCH',
    zIndexList: false,
  },
};

export const ManualRadio: Story = {
  args: {
    mode: 'BOTH',
    page: 'MANUAL',
    zIndexList: false,
  },
  parameters: {
    backgrounds: {
      default: 'ManualModal',
      values: [{ name: 'ManualModal', value: '#775189' }],
    },
  },
};
