import type { Meta, StoryObj } from '@storybook/react';
import { MenuProfile } from 'components/Layout/MenuBar/MenuBar';
import { useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { profileState } from 'utils/recoil/user';

const meta: Meta<typeof MenuProfile> = {
  title: 'Header/MenuProfile',
  component: MenuProfile,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MenuProfile>;

const DefaultMenuProfile = () => {
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  setUser({
    intraId: 'hyungjpa',
    isAdmin: false,
    userImageUri: '',
  });

  setProfile({
    intraId: 'hyungjpa',
    userImageUri: '',
    racketType: 'shakeHand',
    statusMessage: '123124',
    level: 999,
    currentExp: 100,
    maxExp: 200,
    expRate: 0,
    snsNotiOpt: 'SLACK',
  });
  return <MenuProfile />;
};

export const Default: Story = {
  render: () => <DefaultMenuProfile />,
};
