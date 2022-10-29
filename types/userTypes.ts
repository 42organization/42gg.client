export interface ProfileBasic {
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  level: number;
  currentExp: number;
  maxExp: number;
  expRate: number;
}

export interface ProfileRank {
  rank: number;
  ppp: number;
  wins: number;
  losses: number;
  winRate: string;
}
export interface PppChart {
  ppp: number;
  date: string;
}
