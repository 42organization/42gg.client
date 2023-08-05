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
  rankWin: number;
  rankLose: number;
  createdAt: Date;
}

export interface IcoinPolicyHistoryTable {
  coinPolicyList: Array<IcoinPolicyHistory>;
  totalPage: number;
  currentPage: number;
}
