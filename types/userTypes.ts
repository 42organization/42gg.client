export interface BasicProfileType {
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  level: number;
  currentExp: number;
  maxExp: number;
  expRate: number;
}

export interface RankProfileType {
  rank: number;
  ppp: number;
  wins: number;
  losses: number;
  winRate: string;
}
export interface ChartDataItem {
  ppp: number;
  date: string;
}
