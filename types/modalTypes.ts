import { MatchMode } from './mainType';

type EventModal = 'WELCOME' | 'ANNOUNCEMENT';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT';

type FixedModal = 'AFTER_GAME' | 'STAT';

type AdminModal = 'PROFILE' | 'PENALTY';

type ModalName =
  | null
  | `EVENT-${EventModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`
  | `ADMIN-${AdminModal}`;

export interface Cancel {
  isMatched: boolean;
  slotId: number;
  time: string;
}

export interface Enroll {
  slotId: number;
  type: string;
  mode?: MatchMode;
  startTime: Date;
  endTime: Date;
}

export interface Announcement {
  title: string;
  content: string[];
  link: string | null;
}

export interface Exp {
  gameId?: number;
  mode?: MatchMode | null;
}

export interface Manual {
  toggleMode: MatchMode;
}

export interface Modal {
  modalName: ModalName;
  manual?: Manual;
  cancel?: Cancel;
  enroll?: Enroll;
  announcements?: Announcement[];
  exp?: Exp;
  gameId?: number;
  intraId?: string;
}
