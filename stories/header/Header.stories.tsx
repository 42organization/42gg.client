import type { Meta, StoryObj } from '@storybook/react';
import Header from 'components/Layout/Header';
import HeaderStateContext from 'components/Layout/HeaderContext';
import { useSetRecoilState } from 'recoil';
import { liveState } from 'utils/recoil/layout';

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

const NotiOneHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 1,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return (
    <HeaderStateContext>
      <Header />;
    </HeaderStateContext>
  );
};

const NotiZeroHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 0,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return (
    <HeaderStateContext>
      <Header />;
    </HeaderStateContext>
  );
};

const NotiTenHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 10,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return (
    <HeaderStateContext>
      <Header />;
    </HeaderStateContext>
  );
};

export const NotiZero: Story = {
  render: () => <NotiZeroHeader />,
};
export const NotiOne: Story = {
  render: () => <NotiOneHeader />,
};
export const NotiTen: Story = {
  render: () => <NotiTenHeader />,
};
