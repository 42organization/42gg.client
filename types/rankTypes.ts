export interface Rank {
  rank: number;
  intraId: string;
  ppp: number;
  statusMessage: string;
  winRate: number;
}

export interface RankData {
  myIntraId: string;
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: Rank[];
}
