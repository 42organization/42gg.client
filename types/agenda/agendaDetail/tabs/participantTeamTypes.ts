import { Coalition } from 'constants/agenda/agenda';

export interface ParticipantTeamProps {
  teamKey?: string | null;
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  maxMateCount: number;
  coalitions: string[] | Coalition[];
}

export interface PeopleCount {
  [key: string]: number;
}
