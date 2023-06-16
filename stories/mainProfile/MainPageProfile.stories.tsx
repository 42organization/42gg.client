import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import MainPageProfile from 'components/Layout/MainPageProfile';
import { useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { currentMatchState, openCurrentMatchState } from 'utils/recoil/match';

const meta: Meta<typeof MainPageProfile> = {
  title: 'MainPage/MainPageProfile',
  component: MainPageProfile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainPageProfile>;

function SetUser() {
  const setUser = useSetRecoilState(userState);

  setUser({
    intraId: 'Storybook',
    isAdmin: false,
    userImageUri: 'https://picsum.photos/200/300?grayscale',
  });
}

const MatchOne = () => {
  SetUser();

  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  setOpenCurrentMatch(false);

  const setCurrentMatch = useSetRecoilState(currentMatchState);
  setCurrentMatch({
    match: [],
  });
  return <MainPageProfile />;
};

const MatchTwo = () => {
  SetUser();

  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  setOpenCurrentMatch(true);

  const setCurrentMatch = useSetRecoilState(currentMatchState);
  setCurrentMatch({
    match: [
      {
        startTime: '2100-01-02T10:00',
        endTime: '2101-01-02T10:00',
        isMatched: true,
        myTeam: ['Storybook'],
        enemyTeam: ['Cypress'],
        isImminent: false,
      },
    ],
  });
  return <MainPageProfile />;
};

const MatchThree = () => {
  SetUser();

  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  setOpenCurrentMatch(true);

  const setCurrentMatch = useSetRecoilState(currentMatchState);
  setCurrentMatch({
    match: [
      {
        startTime: '2100-01-02T10:00',
        endTime: '2101-01-02T10:00',
        isMatched: true,
        myTeam: ['Storybook'],
        enemyTeam: ['Cypress'],
        isImminent: true,
      },
    ],
  });
  return <MainPageProfile />;
};

const MatchFour = () => {
  SetUser();

  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  setOpenCurrentMatch(true);

  const setCurrentMatch = useSetRecoilState(currentMatchState);
  setCurrentMatch({
    match: [
      {
        startTime: '2100-01-02T10:00',
        endTime: '2101-01-02T10:00',
        isMatched: false,
        myTeam: ['Storybook'],
        enemyTeam: [],
        isImminent: false,
      },
      {
        startTime: '2101-01-02T10:00',
        endTime: '2102-01-02T10:00',
        isMatched: false,
        myTeam: ['Storybook'],
        enemyTeam: [],
        isImminent: false,
      },
    ],
  });
  return <MainPageProfile />;
};

const MatchFive = () => {
  SetUser();

  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  setOpenCurrentMatch(true);

  const setCurrentMatch = useSetRecoilState(currentMatchState);
  setCurrentMatch({
    match: [
      {
        startTime: '2100-01-02T10:00',
        endTime: '2101-01-02T10:00',
        isMatched: false,
        myTeam: ['Storybook'],
        enemyTeam: [],
        isImminent: false,
      },
      {
        startTime: '2101-01-02T10:00',
        endTime: '2102-01-02T10:00',
        isMatched: false,
        myTeam: ['Storybook'],
        enemyTeam: [],
        isImminent: false,
      },
      {
        startTime: '2102-01-02T10:00',
        endTime: '2103-01-02T10:00',
        isMatched: false,
        myTeam: ['Storybook'],
        enemyTeam: [],
        isImminent: false,
      },
    ],
  });
  return <MainPageProfile />;
};

export const Case1: Story = {
  render: () => <MatchOne />,
};

export const Case2: Story = {
  render: () => <MatchTwo />,
};

export const Case3: Story = {
  render: () => <MatchThree />,
};

export const Case4: Story = {
  render: () => <MatchFour />,
};

export const Case5: Story = {
  render: () => <MatchFive />,
};
