export interface Rank {
  rank: number;
  intraId: string;
  statusMessage: string;
  ppp: number;
  winRate: number;
}

export interface Normal {
  rank: number;
  intraId: string;
  statusMessage: string;
  level: number;
  exp: number;
}

export interface RankData {
  myIntraId: string; // 백에 빼줄 것 요청
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: Rank[] | Normal[];
}
