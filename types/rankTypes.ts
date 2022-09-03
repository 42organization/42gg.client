export interface RankMode {
  rank: number;
  intraId: string;
  statusMessage: string;
  ppp: number;
  winRate: number;
}

export interface NormalMode {
  rank: number;
  intraId: string;
  statusMessage: string;
  level: number;
  exp: number;
}

export interface Rank {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: RankMode[] | NormalMode[];
}
