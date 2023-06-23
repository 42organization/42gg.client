import type { Meta, StoryObj } from '@storybook/react';
import Guide from 'components/modal/afterGame/Guide';

const meta: Meta<typeof Guide> = {
  title: 'Modal/AfterGameModal_Guide',
  component: Guide,
  tags: ['autodocs'],
  argTypes: {
    condition: Boolean,
    modalMode: String,
  },
};

export default meta;
type Story = StoryObj<typeof Guide>;

export const NormalGuide: Story = {
  args: {
    condition: true,
    modalMode: 'NORMAL',
  },
};

export const RankGuide: Story = {
  args: {
    condition: true,
    modalMode: 'RANK',
  },
};
export const RankFalseGuide: Story = {
  args: {
    condition: false,
    modalMode: 'RANK',
  },
};
