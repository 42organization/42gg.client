import { atom } from 'recoil';
import { calendarModalProps } from 'types/calendar/modalTypes';

export const calendarModalState = atom<calendarModalProps | null>({
  key: 'calendarModalState',
  default: null,
});
