import { CurrentTeamItemProps } from 'types/agenda/profile/currentListTypes';
import { AgendaHistoryItemProps } from 'types/agenda/profile/historyListTypes';
import type { Meta, StoryObj } from '@storybook/react';
import AgendaProfile from 'pages/agenda/profile/[intraId]';

const currentTeamMockData: CurrentTeamItemProps[] = [
  {
    agendaId: '123',
    agendaTitle: 'PUSH SWAP CONTEST',
    agendaLocation: 'SEOUL',
    teamKey: 'TEAMKEY1',
    isOfficial: true,
    teamName: 'jeongrol',
  },
  {
    agendaId: '1234',
    agendaTitle: 'League Of Legend 42',
    agendaLocation: 'SEOUL',
    teamKey: 'TEAMKEY2',
    isOfficial: true,
    teamName: '7-8기 멤버단',
  },
];
// history MOCK DATA
const historyMockData: AgendaHistoryItemProps[] = [
  {
    agendaId: 'agendaId1',
    agendaTitle: '아젠다 타이틀1',
    agendaStartTime: new Date(),
    agendaEndTime: new Date(),
    agendaCurrentTeam: 8,
    agendaLocation: 'seoul',
    teamKey: 'team1',
    isOfficial: false,
    agendaMaxPeople: 100,
    teamName: 'team Name',
    teamMates: [
      {
        intraId: 'intraId1',
        coalition: 'GUN',
      },
      {
        intraId: 'intraId2',
        coalition: 'GON',
      },
      {
        intraId: 'intraId3',
        coalition: 'LEE',
      },
    ],
  },
];

const meta: Meta = {
  title: 'profile/index',
  component: AgendaProfile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AgendaProfile>;

export const Default: Story = {
  args: {
    currentTeamMockData,
    historyMockData,
  },
};
