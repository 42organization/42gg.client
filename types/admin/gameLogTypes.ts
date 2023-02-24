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
  playTime: string;
  mode: string;
  team1: ITeam[];
  team2: ITeam[];
}

export interface IGames {
  gameLog: IGameLog[] | [];
  currentPage: number;
  totalPage: number;
}
