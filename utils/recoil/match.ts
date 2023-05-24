import { atom } from 'recoil';
import { v1 } from 'uuid';
import { CurrentMatchList } from 'types/matchTypes';

export const openCurrentMatchState = atom<boolean>({
  key: `openCurrentMatchState/${v1()}`,
  default: false,
});

export const reloadMatchState = atom<boolean>({
  key: `reloadMatchState/${v1()}`,
  default: false,
});

export const currentMatchState = atom<CurrentMatchList>({
  key: `currentMatchState/${v1()}`,
  default: [
    {
      startTime: '0000-00-00T00:00',
      endTime: '0000-00-00T00:00',
      isMatched: false,
      myTeam: [],
      enemyTeam: [],
      isImminent: false,
    },
  ],
});
