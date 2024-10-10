import { atom } from 'recoil';
import { agendaModal } from 'types/agenda/modalTypes';

export const agendaModalState = atom<agendaModal | null>({
  key: 'agendaModalState',
  default: null,
});
