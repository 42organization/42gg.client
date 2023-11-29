export type GameType = 'NORMAL' | 'RANK';
export type GameStatus = 'WAIT' | 'BEFORE' | 'LIVE' | 'END';
export interface ITeam {
  intraId1: string;
  intraId2?: string;
  teamId: number;
  score: number;
  win: boolean;
}

export interface IGameLog {
  gameId: number;
  startAt: Date;
  slotTime: string;
  mode: GameType;
  status: GameStatus;
  team1: ITeam;
  team2: ITeam;
}

export interface IGames {
  gameLog: IGameLog[] | [];
  totalPage: number;
}

export type ModifyScoreType = {
  gameId: number;
  team1: ITeam;
  team2: ITeam;
  status: GameStatus;
};
