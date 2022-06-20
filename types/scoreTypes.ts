export interface PlayerInfo {
  userId: string;
  userImageUri: string;
}

export interface PlayersData {
  myTeam: PlayerInfo[];
  enemyTeam: PlayerInfo[];
}

export interface GameResult {
  myScore: number;
  enemyScore: number;
}
