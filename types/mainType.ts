export interface UserData {
  userId: string;
  userImageUri: string;
  notiCount: number;
  userState: UserState;
}

export interface UserState {
  isPlaying: boolean;
  gameId: number;
}
