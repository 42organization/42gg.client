import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export const loginState = atom<boolean>({
  key: `loginState/${v1()}`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});
