export interface Season {
  id: number;
  name: string;
}
export interface ISeason {
  seasonId: number;
  seasonName: string;
  startTime: Date;
  endTime: Date;
  startPpp: number;
  pppGap: number;
  status: string;
}

export interface ISeasonList {
  seasonList: ISeason[];
}
export interface SeasonList {
  seasonList: Season[];
}

export interface ISeasonEditInfo {
  seasonName: string;
  startTime: Date;
  startPpp: number;
  pppGap: number;
}
