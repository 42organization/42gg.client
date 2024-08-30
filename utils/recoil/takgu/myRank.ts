import { atom } from 'recoil';
import { v1 } from 'uuid';
import { MyRank } from 'types/takgu/rankTypes';

export const myRankState = atom<MyRank>({
  key: `myRankState/${v1()}`,
  default: { RANK: 0, NORMAL: 0 },
});

export const scrollState = atom<boolean>({
  key: `scrollState/${v1()}`,
  default: false,
});
