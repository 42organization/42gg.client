export interface PlayerInfo {
  userId: string;
  userImageUri: string;
}

export interface PlayersData {
  myTeam: PlayerInfo[];
  enemyTeam: PlayerInfo[];
}

export interface GameResult {
  myTeamScore: number | '';
  enemyTeamScore: number | '';
}
