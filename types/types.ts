export interface Rank {
  rank: number;
  userId: string;
  ppp: number;
  statusMessage: string;
  winRate: number;
}
export interface player {
  userId: string;
  userImageUri: string;
  wins: number;
  losses: number;
  winRate: number;
  pppChange: number;
}
export interface matches {
  matchId: number;
  type?: string;
  time?: string;
  status?: string;
  team1: player;
  team2: player;
}
