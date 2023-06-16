import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Header from 'components/Layout/Header';
import HeaderStateContext, {
  HeaderContext,
} from 'components/Layout/HeaderContext';
import NotiStateContext from 'components/Layout/NotiBar/NotiContext';
import { NotiProvider } from 'components/Layout/NotiBar/NotiContext';
import { useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { liveState, userState } from 'utils/recoil/layout';
import { profileState } from 'utils/recoil/user';

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

const NotiZeroHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 0,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return <Header />;
};

const NotiOneHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 1,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return <Header />;
};

const NotiTenHeader = () => {
  const setLive = useSetRecoilState(liveState);

  setLive({
    notiCount: 10,
    event: null,
    currentMatchMode: null,
    gameId: null,
  });

  return <Header />;
};

const NotiOpenHeader = () => {
  const HeaderState = useContext(HeaderContext);
  HeaderState?.setOpenNotiBarState(true);

  return <Header />;
};

const MenuOpenHeader = () => {
  const HeaderState = useContext(HeaderContext);
  HeaderState?.setOpenMenuBarState(true);

  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  setUser({
    intraId: 'Storybook',
    isAdmin: false,
    userImageUri: 'https://picsum.photos/200/300?grayscale',
  });

  setProfile({
    intraId: 'Storybook',
    userImageUri: 'https://picsum.photos/200/300?grayscale',
    racketType: 'shakeHand',
    statusMessage: 'I am Storybook',
    level: 99,
    currentExp: 900,
    maxExp: 1000,
    expRate: 0,
    snsNotiOpt: 'SLACK',
  });

  return <Header />;
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

export const MenuOpen: Story = {
  render: () => <MenuOpenHeader />,
};

export const NotiOpen: Story = {
  render: () => <NotiOpenHeader />,
};
