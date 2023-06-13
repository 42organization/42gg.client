import type { Meta, StoryObj } from '@storybook/react';
import EditProfileModal from 'components/modal/profile/EditProfileModal';
import { useSetRecoilState } from 'recoil';
import { profileState } from 'utils/recoil/user';

const meta: Meta<typeof EditProfileModal> = {
  title: 'Modal/EditProfileModal',
  component: EditProfileModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EditProfileModal>;

const DefaultModal = () => {
  const setProfile = useSetRecoilState(profileState);
  const profile = {
    intraId: 'Kim-Tak-gu',
    userImageUri: 'https://cdn.intra.42.fr/users/Kim-Tak-gu.jpg',
    racketType: 'penholder',
    statusMessage: '탁구는 김탁구',
    level: 1,
    currentExp: 100,
    maxExp: 200,
    expRate: 50,
    snsNotiOpt: 'EMAIL' as const,
  };
  setProfile(profile);

  return <EditProfileModal />;
};
export const Default: Story = {
  render: () => <DefaultModal />,
};
