import { useSetRecoilState } from 'recoil';
import type { Meta, StoryObj } from '@storybook/react';
import { profileState } from 'utils/recoil/user';
import EditProfileModal from 'components/modal/profile/EditProfileModal';

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
    tierImageUri:
      'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
    tierName: '무지개 탁구채',
    edge: 'BASIC',
    background: 'BASIC',
  };
  setProfile(profile);

  return <EditProfileModal />;
};
export const Default: Story = {
  render: () => <DefaultModal />,
};
