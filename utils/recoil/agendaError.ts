import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface ErrorStateType {
  msg: string;
  status: number;
}

export const agendaErrorState = atom<ErrorStateType>({
  key: `errorState/${v1()}`,
  default: { msg: '', status: 0 },
});
