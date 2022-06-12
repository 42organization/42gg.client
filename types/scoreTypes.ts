export interface PlayerData {
  userId: string;
  userImageUri: string;
}

export interface GameResult {
  myTeam: PlayerData[];
  enemyTeam: PlayerData[];
}
