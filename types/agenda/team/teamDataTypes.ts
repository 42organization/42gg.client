import { Coalition } from 'constants/agenda/agenda';

export interface TeamDataProps {
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  teamStatus?: string;
  teamKey?: string;
  teamLocation?: string;
  teamAward?: string;
  awardPriority?: number;
  coalitions: string[] | Coalition[];
}
