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
  agendaHost: string;
  agendaLocation: AgendaLocation;
  agendaStatus: AgendaStatus;
  createdAt: Date | string;
  announcementTitle: string;
  isOfficial: boolean;
  agendaisRanking: boolean;
  agendaKey: string;
}

export interface AgendaProps {
  agendaData: AgendaDataProps;
}
