import { atom } from 'recoil';
import { v1 } from 'uuid';

export const updateCoinState = atom<boolean>({
  key: `updateCoinState/${v1()}`,
  default: false,
});
