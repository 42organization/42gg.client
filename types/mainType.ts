export interface UserData {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
}

export interface LiveData {
  notiCount: number;
  event: 'match' | 'game' | null;
}

export interface SearchData {
  users: string[];
}
