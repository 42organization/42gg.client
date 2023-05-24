export interface RankPlayer {
  intraId: string;
  userImageUri: string;
  wins: number;
  losses: number;
  winRate: number;
  pppChange: number | null;
}

export interface NormalPlayer {
  intraId: string;
  userImageUri: string;
  level: number;
}

export interface RankResult {
  players: RankPlayer[] | NormalPlayer[];
  isWin?: boolean;
  score?: number;
}

export interface Game {
  gameId: number;
  mode: string;
  team1: RankResult;
  team2: RankResult;
  type: string;
  status: string;
  time: string;
}

export type GameResult = {
  beforeExp: number;
  beforeMaxExp: number;
  beforeLevel: number;
  increasedExp: number;
  increasedLevel: number;
  afterMaxExp: number;
  changedPpp?: number;
  beforePpp?: number;
};
