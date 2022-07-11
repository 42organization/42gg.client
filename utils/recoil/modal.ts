import { atom } from 'recoil';
import { v1 } from 'uuid';
import { ModalInfo } from 'types/modalTypes';

export const modalState = atom<ModalInfo>({
  key: `modalState/${v1()}`,
  default: { modalName: null },
});
