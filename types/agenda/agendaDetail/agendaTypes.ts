import { AgendaLocation, AgendaStatus } from 'constants/agenda/agenda';

export interface AgendaDataProps {
  agendaTitle: string;
  agendaContents: string;
  agendaDeadLine: Date | string; // format: 2024-09-01T04:35:07
  agendaStartTime: Date | string;
  agendaEndTime: Date | string;
  agendaMinTeam: number;
  agendaMaxTeam: number;
  agendaCurrentTeam: number;
  agendaMinPeople: number;
  agendaMaxPeople: number;
  agendaPoster?: File | null;
  agendaPosterUrl?: string;
  agendaHost: string;
  agendaLocation: AgendaLocation;
  agendaStatus: AgendaStatus;
  createdAt: Date | string;
  announcementTitle: string;
  isOfficial: boolean;
  isRanking?: boolean;
  agendaisRanking: boolean;
  agendaKey: string;
  idx?: number;
}

export interface AgendaProps {
  agendaData: AgendaDataProps;
}

export interface MyTeamDataProps {
  agendaKey: string; // 대회 고유 키
  agendaTitle: string;
  agendaLocation: string; // ENUM 상단참고
  agendaStartTime?: Date | string;
  teamStatus: string;
  teamKey: string; // 내 팀 조회를 위한 key
  isOfficial: boolean; //공식대회여부
  teamName: string; //fe 추가 0728 : 와이어프레임 참고
}
