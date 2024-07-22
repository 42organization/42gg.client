import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  AgendaStatus,
  Coalition,
  AgendaLocation,
} from 'constants/agenda/agenda';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';

// 기본 목데이터 설정
const baseMockData = {
  agendaTitle: '아 기다리고 기다리던 대회',
  agendaHost: 'iamgroot',
  agendaStatus: AgendaStatus.ON_GOING,
  agendaDeadLine: new Date('2024-07-20'),
  agendaStartTime: new Date('2024-07-25'),
  agendaEndTime: new Date('2024-07-30'),
  agendaMinPeople: 2,
  agendaMaxPeople: 2,
};

// 기본 profileData 설정
const baseProfileData = {
  userIntra: 'otherUser',
  userContent: '안녕하세요',
  userGithub: 'test@github.abc',
  userCoalition: Coalition.GUN,
  userLocation: AgendaLocation.SEOUL,
  ticketCount: 1,
};

// 메타데이터 설정
const meta: Meta = {
  title: 'Agenda/AgendaInfo',
  component: AgendaInfo,
};

export default meta;

// 기본 스토리 템플릿
const Template: Story = (args) => <AgendaInfo {...args} />;

// 1. 주최자
export const Host = Template.bind({});
Host.args = {
  agendaData: baseMockData,

  profileData: {
    ...baseProfileData,
    userIntra: 'iamgroot',
  },
  teamListStatus: 204,
};

// 2. 참여자
export const Participant = Template.bind({});
Participant.args = {
  agendaData: baseMockData,
  profileData: baseProfileData,
  teamListStatus: 200,
};

// 3. 미참여자
export const NonParticipant = Template.bind({});
NonParticipant.args = {
  agendaData: baseMockData,

  profileData: baseProfileData,

  teamListStatus: 204,
};

// 4. 팀 참가자 (주최자)
export const TeamHost = Template.bind({});
TeamHost.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
  },
  profileData: {
    ...baseProfileData,
    userIntra: 'iamgroot',
  },
  teamListStatus: 204,
};

// 5. 팀 참가자 (참여자)
export const TeamParticipant = Template.bind({});
TeamParticipant.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
  },
  profileData: baseProfileData,

  teamListStatus: 200,
};

// 6. 팀 참가자 (미참여자)
export const TeamNonParticipant = Template.bind({});
TeamNonParticipant.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
  },
  profileData: baseProfileData,
  teamListStatus: 204,
};

// ---------------------------------------------

export const CompletedHost = Template.bind({});
CompletedHost.args = {
  agendaData: { ...baseMockData, agendaStatus: AgendaStatus.CONFIRM },
  profileData: {
    ...baseProfileData,
    userIntra: 'iamgroot',
  },
  teamListStatus: 204,
};

export const CompletedParticipant = Template.bind({});
CompletedParticipant.args = {
  agendaData: { ...baseMockData, agendaStatus: AgendaStatus.CONFIRM },
  profileData: baseProfileData,
  teamListStatus: 200,
};

export const CompletedNonParticipant = Template.bind({});
CompletedNonParticipant.args = {
  agendaData: { ...baseMockData, agendaStatus: AgendaStatus.CONFIRM },
  profileData: baseProfileData,
  teamListStatus: 204,
};

export const CompletedTeamHost = Template.bind({});
CompletedTeamHost.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
    agendaStatus: AgendaStatus.CONFIRM,
  },
  profileData: {
    ...baseProfileData,
    userIntra: 'iamgroot',
  },
  teamListStatus: 204,
};

export const CompletedTeamParticipant = Template.bind({});
CompletedTeamParticipant.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
    agendaStatus: AgendaStatus.CONFIRM,
  },
  profileData: baseProfileData,
  teamListStatus: 200,
};

export const CompletedTeamNonParticipant = Template.bind({});
CompletedTeamNonParticipant.args = {
  agendaData: {
    ...baseMockData,
    agendaMinPeople: 3,
    agendaMaxPeople: 5,
    agendaStatus: AgendaStatus.CONFIRM,
  },
  profileData: baseProfileData,
  teamListStatus: 204,
};
