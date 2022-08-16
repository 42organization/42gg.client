import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export const adminState = atom<boolean>({
  key: `adminState/${v1()}`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});
