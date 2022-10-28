import { atom } from 'recoil';
import { v1 } from 'uuid';
import { CurrentMatch } from 'types/matchTypes';

export const openCurrentMatchState = atom<boolean>({
  key: `openCurrentMatchState/${v1()}`,
  default: false,
});

export const matchRefreshBtnState = atom<boolean>({
  key: `matchRefreshBtnState/${v1()}`,
  default: false,
});

export const currentMatchState = atom<CurrentMatch>({
  key: `currentMatchState/${v1()}`,
  default: { slotId: 0, time: '', isMatched: false, myTeam: [], enemyTeam: [] },
});
