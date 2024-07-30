import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';

export interface TeamDetailProps {
  teamName: string;
  teamLeaderIntraId: string;
  teamStatus: TeamStatus; //e
  teamLocation: AgendaLocation; //e
  teamContent: string;
  teamMates: {
    intraId: string;
    coalition: Coalition; //e
  }[];
}
