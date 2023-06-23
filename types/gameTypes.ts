// 전체, 일반, 랭크 게임 목록을 받아오는데 사용되는 데이터 타입들

export type RankPlayer = Player & {
  wins: number;
  losses: number;
};

export type Player = {
  intraId: string;
  userImageUri: string;
  level: number;
};

export type Team = {
  players: Player[] | RankPlayer[];
  isWin?: boolean;
  score?: number;
};

export type GameMode = 'NORMAL' | 'RANK';
export type GameStatus = 'LIVE' | 'WAIT' | 'END';

export type Game = {
  gameId: number;
  status: GameStatus;
  mode: GameMode;
  time: string;

  team1: Team;
  team2: Team;
};

export type GameListData = {
  games: Game[];
  isLast: boolean;
};

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
