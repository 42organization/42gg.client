import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';

export interface TeamDetailProps {
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
}

export interface editDataProps {
  teamKey: string;
  teamContent: string;
  teamName: string;
  teamIsPrivate: boolean;
  teamLocation: string;
}
