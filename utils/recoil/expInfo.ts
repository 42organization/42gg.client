import { atom } from 'recoil';
import { expInfo } from 'types/expTypes';
import { v1 } from 'uuid';

export const expInfoState = atom<expInfo>({
  key: `expInfoState/${v1()}`,
  default: {
    maxExp: 0,
    expRate: 0,
    currentExp: 0,
    currentLevel: 0,
    increasedExp: 0,
    increasedLevel: 0,
  },
});
