import { atom } from 'recoil';
import { v1 } from 'uuid';
import { Modal } from 'types/modalTypes';

export const modalState = atom<Modal>({
  key: `modalState/${v1()}`,
  default: { modalName: null },
});

export const eventState = atom<boolean>({
  key: `eventState/${v1()}`,
  default: false,
});

export const firstVisitedState = atom<boolean>({
  key: `firtVisitedState/${v1()}`,
  default: false,
});
