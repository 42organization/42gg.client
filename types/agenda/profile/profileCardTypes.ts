import { AchievementProps } from 'types/agenda/profile/profileDataTypes';

export interface ProfileCardProps {
  userIntraId: string;
  userContent: string;
  userGithub: string;
  imageUrl: string;
  achievements: AchievementProps[];
  getProfileData: () => void;
  isMyProfile: boolean | null;
}
