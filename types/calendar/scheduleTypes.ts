import {
  CalendarClassification,
  CalendarEventTag,
  CalendarJobTag,
  CalendarTechTag,
  CalendarStatus,
} from 'constants/calendar/calendarConstants';

export interface Schedule {
  id: number;
  classification: CalendarClassification;
  eventTag?: CalendarEventTag;
  jobTag?: CalendarJobTag;
  techTag?: CalendarTechTag;
  author: string;
  title: string;
  content: string;
  startTime: string;
  endTime: string;
  link: string;
  sharedCount?: number;
  status?: CalendarStatus;
}
