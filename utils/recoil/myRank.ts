import { atom } from 'recoil';
import { MyRank } from 'types/rankTypes';
import { v1 } from 'uuid';

export const myRankState = atom<MyRank>({
  key: `myRankState/${v1()}`,
  default: { rank: 0, normal: 0 },
});

export const scrollState = atom<boolean>({
  key: `scrollState/${v1()}`,
  default: false,
});
