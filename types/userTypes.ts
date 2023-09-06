export interface ProfileBasic {
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  level: number;
  currentExp: number;
  maxExp: number;
  tierImageUri: string;
  tierName: string;
  expRate: number;
  edge: string;
  background: string;
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
  { id: 'PENHOLDER' },
  { id: 'SHAKEHAND' },
  { id: 'DUAL' },
];

export interface ICoin {
  coin: number;
}

export interface ICoinHistory {
  history: string;
  amount: number;
  createdAt: Date;
}

export interface ICoinHistoryList {
  useCoinList: ICoinHistory[];
  totalPage: number;
}

export interface ICoinHistoryTable {
  useCoinList: ICoinHistory[];
  totalPage: number;
  currentPage: number;
}
