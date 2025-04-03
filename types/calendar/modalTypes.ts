import { ScheduleGroup } from './groupType';
import { Schedule } from './scheduleTypes';

type CalendarModalType =
  | 'detail'
  | 'AddSelect'
  | 'PrivateUpsert'
  | 'PublicUpsert';

export interface calendarModalProps {
  type: CalendarModalType;
  schedule: Schedule;
  groups?: ScheduleGroup[];
  onProceed?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}
