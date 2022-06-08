import { atom } from 'recoil';
import { v1 } from 'uuid';
import { EnrollInfo } from '../../types/matchTypes';

export const enrollInfoState = atom<EnrollInfo | null>({
  key: `enrollInfoState/${v1()}`,
  default: null,
});
