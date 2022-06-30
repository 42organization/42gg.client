import { atom } from 'recoil';
import { v1 } from 'uuid';

export const errorState = atom<string>({
  key: `errorState/${v1()}`,
  default: '',
});
