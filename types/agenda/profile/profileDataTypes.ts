import { AgendaLocation, Coalition } from 'constants/agenda/agenda';

interface ProfileDataProps {
  userIntraId: string;
  userContent: string;
  userGithub: string;
  userCoalition: Coalition;
  userLocation: AgendaLocation;
  ticketCount: number;
}

export interface ProfileImageCardProps {
  profileData: ProfileDataProps | null;
}
