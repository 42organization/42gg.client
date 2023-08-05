export interface IcoinPolicy {
  attendance: number;
  normal: number;
  rankWin: number;
  rankLose: number;
}

export interface IcoinPolicyHistory {
  coinPolicyId: number;
  createUser: string;
  attendance: string;
  normal: number;
  rank_win: number;
  rank_lose: number;
  created_at: Date;
}

export interface IcoinPolicyHistoryTable {
  coinPolicyList: Array<IcoinPolicyHistory>;
  totalPage: number;
  currentPage: number;
}
