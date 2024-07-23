import { AgendaLocation, Coalition } from 'constants/agenda/agenda';

export interface ProfileDataProps {
  userIntra: string;
  userContent: string;
  userGithub: string;
  userCoalition: Coalition;
  userLocation: AgendaLocation;
  ticketCount: number;
}
