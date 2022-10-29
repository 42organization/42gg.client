import { atom } from 'recoil';
import { v1 } from 'uuid';

export const myRankState = atom<number>({
  key: `myRankState/${v1()}`,
  default: 0,
});

export const scrollState = atom<boolean>({
  key: `scrollState/${v1()}`,
  default: false,
});
