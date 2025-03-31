import {
  CalendarClassification,
  CalendarEventTag,
  CalendarJobTag,
  CalendarTechTag,
} from 'constants/calendar/calendarConstants';

export interface CalendarFormData {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  classificationTag: CalendarClassification;
  eventTag?: CalendarEventTag;
  jobTag?: CalendarJobTag;
  techTag?: CalendarTechTag;
  link?: string;
}
