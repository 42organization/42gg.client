export interface RankUser {
  rank: number;
  intraId: string;
  statusMessage: string;
  ppp: number;
  userImageUri: string;
}

export interface NormalUser {
  rank: number;
  intraId: string;
  statusMessage: string;
  level: number;
  exp: number;
  userImageUri: string;
}

export interface MyRank {
  rank: number;
  normal: number;
}

export interface Rank {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: RankUser[] | NormalUser[];
}
