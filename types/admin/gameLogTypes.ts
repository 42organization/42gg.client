export interface ITeam {
  intraId: string;
  teamId: number;
  score?: number;
  win?: boolean;
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
  gameLog: IGameLog[] | null;
  currentPage: number;
  totalPage: number;
}
