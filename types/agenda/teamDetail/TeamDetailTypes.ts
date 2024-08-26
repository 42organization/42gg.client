import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';

export interface TeamDetailProps {
  teamKey?: string;
  teamName: string;
  teamLeaderIntraId: string;
  teamStatus: TeamStatus; //e
  teamLocation: AgendaLocation; //e
  teamContent: string;
  teamIsPrivate: boolean;
  teamMates: {
    intraId: string;
    coalition: Coalition; //e
  }[];
  teamAward?: string;
  teamAwardPriority?: number;
}
