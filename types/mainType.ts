export type Mode = 'normal' | 'rank' | 'both';

export interface UserType {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
  seasonMode: Mode;
}

export interface UserLiveType {
  notiCount: number;
  event: 'match' | 'game' | null;
  seasonMode: Mode | null;
  currentMatchMode: Mode | null;
}
