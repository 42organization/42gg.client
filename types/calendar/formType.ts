// import {
//   CalendarEventTag,
//   CalendarJobTag,
//   CalendarTechTag,
// } from 'constants/calendar/calendarConstants';

export interface CalendarFormData {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  link?: string;
}

// export enum EventTag {
//   WENDS_FORUM = '수요지식회',
//   JOB_EXPLANATION = '취업설명회',
//   LECTURE = '강연',
//   FOUNDATION_EVENT = '재단행사',
//   ETC = '기타',
// }

// export enum CalendarJobTag {
//   SHORTS_INTERN = 'SHORTS_INTERN',
//   INCRUIT_INTERN = 'INCRUIT_INTERN',
//   NEW_COMER = 'NEW_COMER',
//   EXPERIENCED = 'EXPERIENCED',
// }

// export enum CalendarTechTag {
//   FRONT = 'FRONT',
//   BACK = 'BACK',
//   DATA = 'DATA',
//   CLOUD = 'CLOUD',
//   AI = 'AI',
//   SERVER = 'SERVER',
//   NETWORK = 'NETWORK',
//   ETC = 'ETC',
// }
