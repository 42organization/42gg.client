import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { Coalition } from 'constants/agenda/agenda';

export interface numberProps {
  max: number;
}

export interface PeopleCount {
  [key: string]: number;
}

export interface ParticipantTabProps {
  agendaData: AgendaDataProps;
  myTeam?: TeamDataProps | null;
}

export interface ParticipantTeamListProps {
  max: number;
  myTeam?: TeamDataProps | null;
}

// 개인 참가자 타입
export interface ParticipantProps {
  teamName: string;
  teamLeaderIntraId?: string;
  teamMateCount?: number;
  teamAward?: string;
  awardPriority?: number;
  coalitions: string[] | Coalition[];
}

export interface ParticipantTeamProps {
  teamKey?: string | null;
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  maxMateCount: number;
  coalitions: string[] | Coalition[];
}
