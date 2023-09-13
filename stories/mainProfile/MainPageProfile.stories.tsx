import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import type { Meta, StoryObj } from '@storybook/react';
import { userState } from 'utils/recoil/layout';
import MainPageProfile from 'components/Layout/MainPageProfile';

const meta: Meta<typeof MainPageProfile> = {
  title: 'MainPageProfile/MainPageProfile',
  component: MainPageProfile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainPageProfile>;

function useSetUser() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
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
  }, []);
}

const MainDefault = () => {
  useSetUser();
  return <MainPageProfile />;
};

export const Case1: Story = {
  render: () => <MainDefault />,
};
