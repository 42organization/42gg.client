export type GameType = 'NORMAL' | 'RANK';

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
};
