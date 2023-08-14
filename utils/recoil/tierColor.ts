import { selector } from 'recoil';
import { profileState } from './user';
import { v1 } from 'uuid';

export const tierIdSelector = selector<number>({
  key: `profileState/${v1()}`,
  get: ({ get }) => {
    const myTier = get(profileState).tierName;
    const tierList = ['손', '빨', '노', '초', '파', '검', '무'];
    const index = tierList.findIndex((tier) => tier[0] === myTier[0]);
    return index;
  },
});
