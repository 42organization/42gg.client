import { Coalition } from 'constants/agenda/agenda';

export interface teamDataProps {
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  teamKey: string;
  coalitions: string[] | Coalition[];
}
