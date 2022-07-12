import { atom } from 'recoil';
import { v1 } from 'uuid';
import { CurrentMatch } from 'types/matchTypes';

export const openCurrentMatchInfoState = atom<boolean>({
  key: `openCurrentMatchInfoState/${v1()}`,
  default: false,
});

export const matchRefreshBtnState = atom<boolean>({
  key: `matchRefreshBtnState/${v1()}`,
  default: false,
});

export const currentMatchInfo = atom<CurrentMatch>({
  key: `currentMatchInfo/${v1()}`,
  default: { slotId: 0, time: '', isMatched: false, myTeam: [], enemyTeam: [] },
});
