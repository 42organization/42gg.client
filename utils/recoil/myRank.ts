import { atom } from 'recoil';
import { MyRank } from 'types/rankTypes';
import { v1 } from 'uuid';

export const myRankState = atom<MyRank>({
  key: `myRankState/${v1()}`,
  default: { rank: 0, normal: 0, challenge: 0, clicked: false },
});

export const pageState = atom<number>({
  key: `pageState/${v1()}`,
  default: 1,
});

export const myRankScrollState = atom<boolean>({
  key: `myRankScrollState/${v1()}`,
  default: false,
});

export const topScrollState = atom<boolean>({
  key: `topScrollState/${v1()}`,
  default: false,
});
