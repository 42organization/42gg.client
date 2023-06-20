import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Header from 'components/Layout/Header';
import HeaderStateContext, {
  HeaderContext,
} from 'components/Layout/HeaderContext';
import { useContext, useEffect } from 'react';

const meta: Meta<typeof Header> = {
  title: 'Drawer/NotiBar',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <HeaderStateContext>
        <Story />
      </HeaderStateContext>
    ),
  ],
};

const NotiHeader = ({ open }: { open: boolean }) => {
  const HeaderState = useContext(HeaderContext);
  useEffect(() => {
    HeaderState?.setOpenNotiBarState(open);
  }, []);

  return <Header />;
};

export default meta;
type Story = StoryObj<typeof Header>;

export const NotiOpen: Story = {
  render: () => <NotiHeader open={true} />,
};

export const NotiClose: Story = {
  render: () => <NotiHeader open={false} />,
};
