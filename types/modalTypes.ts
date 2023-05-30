import { MatchMode } from './mainType';
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
}

export interface Enroll {
  startTime: string;
  endTime: string;
  mode?: MatchMode;
}

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

export interface manual {
  toggleMode: MatchMode;
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
  manual?: manual;
  cancel?: Cancel;
  enroll?: Enroll;
  announcement?: Announcement;
  exp?: Exp;
  gameId?: number;
  intraId?: string;
  detailContent?: string;
  feedback?: IFeedback;
  userId?: number;
  ISeason?: ISeason;
}
