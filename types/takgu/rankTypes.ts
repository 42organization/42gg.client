export type ToggleMode = 'NORMAL' | 'RANK';

interface BaseUser {
  rank: number;
  intraId: string;
  statusMessage: string;
  textColor: string;
}

export interface RankUser extends BaseUser {
  ppp: number;
  tierImageUri: string;
}
export interface NormalUser extends BaseUser {
  level: number;
  exp: number;
}

export interface MyRank {
  RANK: number;
  NORMAL: number;
}

export interface Rank {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: RankUser[] | NormalUser[];
}

export interface userImages {
  intraId: string;
  imageUri: string;
  tierImage: string;
  edge: string;
}

export interface RankMain {
  rankList: userImages[];
}
