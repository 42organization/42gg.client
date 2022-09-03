import { atom } from 'recoil';
import { v1 } from 'uuid';
import { Seasons } from 'types/seasonTypes';

export const seasonState = atom<Seasons>({
  key: `seasonState/${v1()}`,
  default: { seasonList: [] },
});
