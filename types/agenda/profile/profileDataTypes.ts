import { AgendaLocation, Coalition } from 'constants/agenda/agenda';

export interface ProfileDataProps {
  achievements: AchievementProps[];
  imageUrl: string;
  ticketCount: number;
  userCoalition: Coalition;
  userContent: string;
  userGithub: string;
  userIntraId: string;
  userLocation: AgendaLocation;
}

export interface LoginInfoDataProps {
  intraId: string;
  isAdmin: boolean;
}

export interface AchievementProps {
  id: number;
  name: string;
  image: string;
  description: string;
  kind: string;
  nbr_of_success: string;
  tier: string;
  users_url: string;
  visible: boolean;
}
