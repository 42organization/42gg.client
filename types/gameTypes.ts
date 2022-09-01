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

export interface RankInfo {
  players: RankPlayer[] | NormalPlayer[];
  isWin?: boolean;
  score?: number;
}

export interface GameData {
  gameId: number;
  mode: string;
  team1: RankInfo;
  team2: RankInfo;
  type: string;
  status: string;
  time: string;
}
