export interface Player {
  userId: string;
  userImageUri: string;
  wins: number;
  losses: number;
  winRate: number;
  pppChange: number;
}

export interface Matches {
  matchId: number;
  type?: string;
  status?: string;
  time?: string;
  team1: Player;
  team2: Player;
  isWin?: boolean;
  score?: number;
}
