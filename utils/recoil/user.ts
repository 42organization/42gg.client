import { ProfileInfo } from './../../types/userTypes';
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const profileInfoState = atom<ProfileInfo>({
  key: `profileInfoState/${v1()}`,
  default: {
    intraId: '',
    userImageUri: '',
    racketType: 'shakeHand',
    statusMessage: '',
    level: 0,
    currentExp: 0,
    maxExp: 0,
  },
});
