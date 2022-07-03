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

export const openCurrentMatchInfoState = atom<boolean>({
  key: `openCurrentMatchInfoState/${v1()}`,
  default: false,
});

export const matchRefreshBtnState = atom<boolean>({
  key: `matchRefreshBtnState/${v1()}`,
  default: false,
});

export const matchModalState = atom<'enroll' | 'reject' | 'manual' | null>({
  key: `matchModalState/${v1()}`,
  default: null,
});
