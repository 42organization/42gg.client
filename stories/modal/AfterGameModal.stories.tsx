import type { Meta, StoryObj } from '@storybook/react';
import AfterGameModal from 'components/modal/afterGame/AfterGameModal';
import Guide from 'components/modal/afterGame/Guide';
import { Button } from 'components/modal/afterGame/Buttons';

const meta: Meta<typeof AfterGameModal> = {
  title: 'Modal/AfterGameModal',
  component: AfterGameModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AfterGameModal>;

const DefaultModal = () => {
  return (
    <div>
      <Guide condition={true} modalMode='RANK' />
    </div>
  );
};

export const AfterGame: Story = {
  render: () => <DefaultModal />,
};
