export interface Team {
  userId: string;
  userImageUri: string;
  wins: number;
  losses: number;
  winRate: number;
  pppChange: number;
  isWin: boolean;
  score: number;
}

export interface Game {
  matchId: number;
  team1: Team;
  team2: Team;
  type: string;
  status: string;
  time: string;
}

export type Games = Game[];
