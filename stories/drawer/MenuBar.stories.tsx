import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Header from 'components/Layout/Header';
import HeaderStateContext, {
  HeaderContext,
} from 'components/Layout/HeaderContext';
import { useContext, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { profileState } from 'utils/recoil/user';

const meta: Meta<typeof Header> = {
  title: 'Drawer/MenuBar',
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

const MenuHeader = ({ open }: { open: boolean }) => {
  const HeaderState = useContext(HeaderContext);

  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    HeaderState?.setOpenMenuBarState(open);

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
  }, []);

  return <Header />;
};

export const MenuOpen: Story = {
  render: () => <MenuHeader open={true} />,
};

export const MenuClose: Story = {
  render: () => <MenuHeader open={false} />,
};
