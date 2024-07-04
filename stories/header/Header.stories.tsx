import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { liveState } from 'utils/recoil/layout';
import Header from 'components/takgu/Layout/Header';
import HeaderStateContext from 'components/takgu/Layout/HeaderContext';

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
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

export default meta;
type Story = StoryObj<typeof Header>;

const NotiHeader = ({ notiCnt }: { notiCnt: number }) => {
  const setLive = useSetRecoilState(liveState);

  useEffect(() => {
    setLive({
      notiCount: notiCnt,
      event: null,
      currentGameMode: null,
      gameId: null,
    });
  }, []);

  return <Header />;
};

export const NotiZero: Story = {
  render: () => <NotiHeader notiCnt={0} />,
};

export const NotiOne: Story = {
  render: () => <NotiHeader notiCnt={1} />,
};

export const NotiTen: Story = {
  render: () => <NotiHeader notiCnt={10} />,
};
