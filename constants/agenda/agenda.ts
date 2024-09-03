export const enum AgendaLocation {
  SEOUL = 'SEOUL',
  GYEONGSAN = 'GYEONGSAN',
  MIX = 'MIX',
}

export const enum AgendaStatus {
  CANCEL = 'CANCEL', // 취소
  OPEN = 'OPEN', // 모집 중
  CONFIRM = 'CONFIRM', // 진행 중
  FINISH = 'FINISH', // 진행 완료
}

export const enum TeamStatus {
  OPEN = 'OPEN',
  CANCEL = 'CANCEL',
  CONFIRM = 'CONFIRM',
}

export const enum Authority {
  HOST = 'HOST',
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
  GEUST = 'GEUST',
  NONE = 'NONE',
}

export const enum Coalition {
  GUN = 'GUN',
  GON = 'GON',
  GAM = 'GAM',
  LEE = 'LEE',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  AUTUMN = 'AUTUMN',
  WINTER = 'WINTER',
  OTHER = 'OTHER',
}
