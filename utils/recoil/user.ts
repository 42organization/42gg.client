import { ProfileInfo } from './../../types/userTypes';
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const profileInfoState = atom<ProfileInfo>({
  key: `profileInfoState/${v1()}`,
  default: {
    intraId: '',
    userImageUri: '',
    rank: 0,
    ppp: 0,
    wins: 0,
    losses: 0,
    winRate: '0%',
    racketType: 'shakeHand',
    statusMessage: '',
  },
});
