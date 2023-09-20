export interface IcoinPolicy {
  attendance: number;
  normal: number;
  rankWin: number;
  rankLose: number;
}

export interface IcoinPolicyHistory {
  coinPolicyId: number;
  createUserId: string;
  attendance: number;
  normal: number;
  rankWin: number;
  rankLose: number;
  createdAt: Date;
}
