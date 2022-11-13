import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { SeasonList } from 'types/seasonTypes';

export const seasonListState = atom<SeasonList>({
  key: `seasonListState/${v1()}`,
  default: {
    seasonMode: 'rank',
    seasonList: [
      {
        id: 0,
        name: '',
      },
    ],
  },
});

export const latestSeasonIdState = selector<number>({
  key: `latestSeasonIdState/${v1()}`,
  get: ({ get }) => {
    return get(seasonListState).seasonList[0].id;
  },
});
