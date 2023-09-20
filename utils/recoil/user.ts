import { atom } from 'recoil';
import { v1 } from 'uuid';
import { ProfileBasic } from 'types/userTypes';

export const profileState = atom<ProfileBasic>({
  key: `profileState/${v1()}`,
  default: {
    intraId: '',
    userImageUri: '',
    racketType: 'shakeHand',
    statusMessage: '',
    level: 0,
    currentExp: 0,
    maxExp: 0,
    tierImageUri: '',
    tierName: '',
    expRate: 0,
    edge: 'BASIC',
    background: 'BASIC',
    snsNotiOpt: 'SLACK',
  },
});
