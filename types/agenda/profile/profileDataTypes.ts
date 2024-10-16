import { AgendaLocation, Coalition } from 'constants/agenda/agenda';

export interface IntraProfileDataProps {
  intraId: string;
  imageUrl: string;
  achievements: AchievementProps[];
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

export interface AgendaProfileDataProps {
  userIntraId: string;
  userContent: string; //50자 이내
  userGithub: string;
  userCoalition: string; // ENUM 상단확인
  userLocation: string; // 혹시나 서울/경산 이외 들어울 경우 예외처리
}
