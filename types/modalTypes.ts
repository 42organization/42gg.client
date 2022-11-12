import { MatchMode } from './mainType';

type MainModal = 'WELCOME';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT';

type FixedModal = 'AFTER_GAME' | 'EXP';

type ModalName =
  | null
  | `MAIN-${MainModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`;

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

export interface Exp {
  gameId: number;
  mode: MatchMode | null;
}

export interface Manual {
  toggleMode: MatchMode;
}

export interface Modal {
  modalName: ModalName;
  manual?: Manual;
  cancel?: Cancel;
  enroll?: Enroll;
  exp?: Exp;
  gameId?: number;
}
