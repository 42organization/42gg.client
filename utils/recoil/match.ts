import { atom } from 'recoil';
import { v1 } from 'uuid';
import { EnrollInfo } from 'types/matchTypes';

export const enrollInfoState = atom<EnrollInfo | null>({
  key: `enrollInfoState/${v1()}`,
  default: null,
});

export const cancelModalState = atom<boolean>({
  key: `cancelModalState/${v1()}`,
  default: false,
});

export const currentMatchInfoState = atom<boolean>({
  key: `currentMatchInfoState/${v1()}`,
  default: false,
});
