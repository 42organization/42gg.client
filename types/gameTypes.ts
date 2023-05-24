// export interface RankPlayer {
//   intraId: string;
//   userImageUri: string;
//   wins: number;
//   losses: number;
//   winRate: number;
//   pppChange: number | null;
// }

// export interface NormalPlayer {
//   intraId: string;
//   userImageUri: string;
//   level: number;
// }

// export interface RankResult {
//   players: RankPlayer[] | NormalPlayer[];
//   isWin?: boolean;
//   score?: number;
// }

// export interface Game {
//   gameId: number;
//   mode: string;
//   team1: RankResult;
//   team2: RankResult;
//   type: string;
//   status: string;
//   time: string;
// }

// 전체, 일반, 랭크 게임 목록을 받아오는데 사용되는 데이터 타입들

export type Player = {
  intraId: string;
  userImageUri: string;
  level: number;
};

export type Team = {
  players: Player[];
  isWin?: boolean;
  score?: number;
};

export type GameMode = 'NORMAL' | 'RANK';

export type Game = {
  gameId: number;
  status: string;
  mode: GameMode;
  time: string;
  team1: Team;
  team2: Team;
};

export type GameListData = {
  games: Game[];
  isLast: boolean;
};
