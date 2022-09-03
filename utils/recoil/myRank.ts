import { atom } from 'recoil';
import { v1 } from 'uuid';

export const myRankPosition = atom<number>({
  key: `myRankPosition/${v1()}`,
  default: 0,
});

export const isMyRankScroll = atom<boolean>({
  key: `myRankScroll/${v1()}`,
  default: false,
});
