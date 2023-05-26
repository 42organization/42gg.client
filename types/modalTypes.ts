import { MatchMode, NewMatchMode } from './mainType';
import { Value } from 'react-quill';
import { IFeedback } from 'components/admin/feedback/FeedbackTable';

type EventModal = 'WELCOME' | 'ANNOUNCEMENT';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT';

type FixedModal = 'AFTER_GAME' | 'STAT';

type AdminModal =
  | 'PROFILE'
  | 'PENALTY'
  | 'PENALTY_DELETE'
  | 'NOTI_ALL'
  | 'NOTI_USER'
  | 'CHECK_FEEDBACK'
  | 'DETAIL_CONTENT'
  | 'SEASON_EDIT';

type ModalName =
  | null
  | `EVENT-${EventModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`
  | `ADMIN-${AdminModal}`;
export interface Cancel {
  startTime: string;
  isMatched: boolean;
}
// export interface Cancel {
//   isMatched: boolean;
//   slotId: number;
//   time: string;
// }

export interface NewEnroll {
  startTime: string;
  endTime: string;
  mode?: NewMatchMode;
}

// export interface Enroll {
//   slotId: number;
//   type: string;
//   mode?: MatchMode;
//   slotStartTime: Date;
//   slotEndTime: Date;
// }

export interface Announcement {
  content: Value;
}

export interface Exp {
  gameId?: number;
  mode?: MatchMode | null;
}

export interface Manual {
  toggleMode: MatchMode;
}

export interface NewManual {
  toggleMode: NewMatchMode;
}

export interface ISeason {
  seasonId: number;
  seasonMode: string;
  seasonName: string;
  startTime: Date;
  endTime: Date;
  startPpp: number;
  pppGap: number;
  status: number;
}

export interface Modal {
  modalName: ModalName;
  // manual?: Manual;
  manual?: NewManual;
  cancel?: Cancel;
  // enroll?: Enroll;
  enroll?: NewEnroll;
  announcement?: Announcement;
  exp?: Exp;
  gameId?: number;
  intraId?: string;
  detailContent?: string;
  feedback?: IFeedback;
  userId?: number;
  ISeason?: ISeason;
}
