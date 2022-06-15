import { atom } from 'recoil';
import { v1 } from 'uuid';

export const myRankPosition = atom<number>({
  key: `myRankPosition/${v1()}`, // unique ID (다른 atoms/selectors을 구별하기 위해서)
  default: 0, // default value (aka initial value)
});

export const isScrollState = atom<boolean>({
  key: `myRankScroll/${v1()}`, // unique ID (다른 atoms/selectors을 구별하기 위해서)
  default: false, // default value (aka initial value)
});
