import { AgendaStatus } from 'constants/agenda/agenda';

export interface AgendaDataProps {
  agendaTitle: string;
  agendaContents: string;
  agendaDeadLine: Date;
  agendaStartTime: Date;
  agendaEndTime: Date;
  agendaMinTeam: number;
  agendaMaxTeam: number;
  agendaCurrentTeam: number;
  agendaMinPeople: number;
  agendaMaxPeople: number;
  agendaPoster: null;
  agendaHost: string;
  agendaLocation: string;
  agendaStatus: AgendaStatus;
  createdAt: Date;
  announcementTitle: string;
  isOfficial: boolean;
  agendaisRanking: boolean;
}

export interface AgendaProps {
  agendaData: AgendaDataProps;
}
