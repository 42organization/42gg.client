export interface ProfileBasic {
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  level: number;
  currentExp: number;
  maxExp: number;
  expRate: number;
  snsNotiOpt: 'NONE' | 'SLACK' | 'EMAIL' | 'BOTH';
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

export const racketTypes = [
  { id: 'penholder', label: 'PENHOLDER' },
  { id: 'shakehand', label: 'SHAKEHAND' },
  { id: 'dual', label: 'DUAL' },
];
