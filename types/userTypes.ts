export interface ProfileInfo {
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  level: number;
  currentExp: number;
  maxExp: number;
}

export interface RankProfileInfo {
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
