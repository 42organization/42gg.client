import { atom, selectorFamily } from 'recoil';
import { v1 } from 'uuid';
import { CurrentMatchList } from 'types/takgu/matchTypes';

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
  default: {
    match: [
      {
        startTime: '0000-00-00T00:00',
        endTime: '0000-00-00T00:00',
        isMatched: false,
        myTeam: [],
        enemyTeam: [],
        isImminent: false,
      },
    ],
  },
});

export const myCurrentMatch = selectorFamily({
  key: `myCurrentMatch/${v1()}`,
  get:
    (startTime) =>
    ({ get }) => {
      const currentMatchList = get(currentMatchState);
      const match = currentMatchList.match;
      for (const currentMatch of match) {
        if (currentMatch.startTime === startTime) {
          return currentMatch;
        }
      }
      return null;
    },
});
