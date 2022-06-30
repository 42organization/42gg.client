export interface UserData {
  intraId: string;
  userImageUri: string;
}

export interface LiveData {
  notiCount: number;
  event: string | null;
}

export interface SearchData {
  users: string[];
}
