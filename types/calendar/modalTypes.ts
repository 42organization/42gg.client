import { ScheduleGroup } from './groupType';
import { Schedule } from './scheduleTypes';

type CalendarModalType =
  | 'detail'
  | 'AddSelect'
  | 'PrivateUpsert'
  | 'PublicUpsert'
  | 'PublicEdit';

export interface calendarModalProps {
  type: CalendarModalType;
  schedule: Schedule;
  groups?: ScheduleGroup[];
}
