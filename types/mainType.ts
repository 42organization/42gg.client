export type Mode = 'normal' | 'rank' | 'both';

export interface UserData {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
  mode: Mode;
}

export interface LiveData {
  notiCount: number;
  event: 'match' | 'game' | null;
  mode: Mode | null;
}

export interface SearchData {
  users: string[];
}
