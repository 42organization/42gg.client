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
