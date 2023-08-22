import { selector } from 'recoil';
import { v1 } from 'uuid';
import { profileState } from 'utils/recoil/user';

export const tierIdSelector = selector<string>({
  key: `profileState/${v1()}`,
  get: ({ get }) => {
    const myTier = get(profileState).tierName;
    const tierList = ['손', '빨', '노', '초', '파', '검', '무'];
    const tierColor = [
      'none',
      'red',
      'yellow',
      'green',
      'blue',
      'black',
      'rainbow',
    ];
    const index = tierList.findIndex((tier) => tier[0] === myTier[0]);
    return tierColor[index];
  },
});
