import { selector } from 'recoil';
import { profileState } from './user';
import { v1 } from 'uuid';

export const tierIdSelector = selector<string>({
  key: `profileState/${v1()}`,
  get: ({ get }) => {
    const myTier = get(profileState).tierName;
    const tierColor: { [key: string]: string } = {
      손: 'none',
      빨: 'red',
      노: 'yellow',
      초: 'green',
      파: 'blue',
      검: 'black',
      무: 'rainbow',
    };
    return tierColor[myTier[0]];
  },
});
