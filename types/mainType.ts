export interface UserData {
  userId: string;
  userImageUri: string;
  myRank: number;
  notiCount: number;
  userState: UserState;
}

export interface UserState {
  isPlaying: boolean;
  gameId: number;
}

export interface SearchData {
  users: string[];
}
