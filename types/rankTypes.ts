export interface Rank {
  rank: number;
  intraId: string;
  ppp: number;
  statusMessage: string;
  winRate: number;
}

export interface RankData {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: Rank[];
}
