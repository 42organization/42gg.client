import { atom } from 'recoil';
import { v1 } from 'uuid';
import { CurrentMatch } from 'types/matchTypes';

export const openCurrentMatchState = atom<boolean>({
  key: `openCurrentMatchState/${v1()}`,
  default: false,
});

export const reloadMatchState = atom<boolean>({
  key: `reloadMatchState/${v1()}`,
  default: false,
});

export const showModeWrapState = atom<boolean>({
  key: `showModeWrapState/${v1()}`,
  default: false,
});

export const currentMatchState = atom<CurrentMatch>({
  key: `currentMatchState/${v1()}`,
  default: {
    slotId: 0,
    time: '',
    isMatched: false,
    myTeam: [],
    enemyTeam: [],
    mode: '',
  },
});
