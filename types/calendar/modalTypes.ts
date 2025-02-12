import { Schedule } from './scheduleTypes';

type CalendarModalType =
  | 'detail'
  | 'AddSelect'
  | 'PrivateUpsert'
  | 'PublicUpsert';

export interface calendarModalProps {
  type: CalendarModalType;
  schedule?: Schedule;
}
