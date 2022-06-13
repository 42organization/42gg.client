export interface Rank {
  rank: number;
  userId: string;
  ppp: number;
  statusMessage: string;
  winRate: number;
}

export interface Info {
  count: number;
  page: number;
  next: string;
  previous: string;
}

export interface RankData {
  info: Info;
  rankList: Rank[];
}
