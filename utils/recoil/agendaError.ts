import { atom } from 'recoil';
import { v1 } from 'uuid';

interface ErrorState {
  msg: string;
  status: number;
}

export const agendaErrorState = atom<ErrorState>({
  key: `errorState/${v1()}`,
  default: { msg: '', status: 0 },
});
