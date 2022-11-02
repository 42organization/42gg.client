import { atom } from 'recoil';
import { v1 } from 'uuid';
import { SeasonList } from 'types/seasonTypes';

export const seasonListState = atom<SeasonList>({
  key: `seasonListState/${v1()}`,
  default: { seasonMode: 'normal', seasonList: [] },
});
