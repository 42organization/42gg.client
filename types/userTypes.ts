export interface ProfileInfo {
  intraId: string;
  userImageUri: string;
  rank: number;
  ppp: number;
  wins: number;
  losses: number;
  winRate: string;
  racketType: string;
  statusMessage: string;
}

export interface ChartDataItem {
  ppp: number;
  date: string;
}
