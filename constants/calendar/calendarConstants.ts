export enum CalendarClassification {
  EVENT = 'EVENT',
  JOB = 'JOB_NOTICE',
  PRIVATE = 'PRIVATE_SCHEDULE',
}

export enum CalendarEventTag {
  OFFICIAL_EVENT = 'OFFICIAL_EVENT',
  WENDS_FORUM = 'WENDS_FORUM',
  JOB_FORUM = 'JOB_FORUM',
  INSTRUCTION = 'INSTRUCTION',
  ETC = 'ETC',
}

export enum CalendarJobTag {
  SHORTS_INTERN = 'SHORTS_INTERN',
  INCRUIT_INTERN = 'INCRUIT_INTERN',
  NEW_COMER = 'NEW_COMER',
  EXPERIENCED = 'EXPERIENCED',
}

export enum CalendarTechTag {
  FRONT = 'FRONT_END',
  BACK = 'BACK_END',
  DATA = 'DATA',
  CLOUD = 'CLOUD',
  AI = 'AI',
  SERVER = 'SERVER',
  NETWORK = 'NETWORK',
  ETC = 'ETC',
}

export enum CalendarStatus {
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  DELETE = 'DELETE',
}

export const eventTagLabels: Record<CalendarEventTag, string> = {
  [CalendarEventTag.OFFICIAL_EVENT]: '공식 일정',
  [CalendarEventTag.WENDS_FORUM]: '수요 지식회',
  [CalendarEventTag.JOB_FORUM]: '취업 설명회',
  [CalendarEventTag.INSTRUCTION]: '강연',
  [CalendarEventTag.ETC]: '기타',
};

export const jobTagLabels: Record<CalendarJobTag, string> = {
  [CalendarJobTag.SHORTS_INTERN]: '단기 인턴',
  [CalendarJobTag.INCRUIT_INTERN]: '인턴',
  [CalendarJobTag.NEW_COMER]: '신입',
  [CalendarJobTag.EXPERIENCED]: '경력',
};

export const techTagLabels: Record<CalendarTechTag, string> = {
  [CalendarTechTag.FRONT]: 'FRONT',
  [CalendarTechTag.BACK]: 'BACK',
  [CalendarTechTag.DATA]: 'DATA',
  [CalendarTechTag.CLOUD]: 'CLOUD',
  [CalendarTechTag.AI]: 'AI',
  [CalendarTechTag.SERVER]: 'SERVER',
  [CalendarTechTag.NETWORK]: 'NETWORK',
  [CalendarTechTag.ETC]: 'ETC',
};
