import { useContext, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { userState } from 'utils/recoil/layout';
import { profileState } from 'utils/recoil/user';
import Header from 'components/Layout/Header';
import HeaderStateContext, {
  HeaderContext,
} from 'components/Layout/HeaderContext';

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
      isAttended: false,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      tierName: '무지개 탁구채',
      level: 40,
      edgeType: 'BASIC',
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
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      tierName: '무지개 탁구채',
      edge: 'BASIC',
      background: 'BASIC',
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
