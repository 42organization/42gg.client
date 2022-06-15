export interface Rank {
  rank: number;
  userId: string;
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
