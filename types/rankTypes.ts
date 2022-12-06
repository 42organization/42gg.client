export interface RankUser {
  rank: number;
  intraId: string;
  statusMessage: string;
  ppp: number;
  winRate: number;
}

export interface NormalUser {
  rank: number;
  intraId: string;
  statusMessage: string;
  level: number;
  exp: number;
}

export interface MyRank {
  rank: number;
  normal: number;
  challenge: number;
  clicked: boolean;
}

export interface Rank {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: RankUser[] | NormalUser[];
}
