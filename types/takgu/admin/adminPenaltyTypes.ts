export interface IPenaltyInfo {
  intraId: string;
  penaltyTime: number;
  reason: string;
}

export interface IPenalty {
  penaltyId: number;
  releaseTime: Date;
  intraId: string;
  reason: string;
}

export interface IPenaltyTable {
  penaltyList: IPenalty[];
  totalPage: number;
  currentPage: number;
}
