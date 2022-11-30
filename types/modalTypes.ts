import { MatchMode } from './mainType';

type MainModal = 'WELCOME';

type MenuModal = 'REPORT' | 'LOGOUT' | 'MATCHTRIGGER';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL' | 'CHALLENGE';

type UserModal = 'PROFILE_EDIT';

type FixedModal = 'AFTER_GAME' | 'STAT';

type ModalName =
  | null
  | `MAIN-${MainModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`;

export interface Cancel {
  slotId: number;
}

export interface Enroll {
  slotId: number;
  type: string;
  mode?: MatchMode;
}

export interface Challenge {
  slotId: number;
  type: string;
}

export interface Exp {
  gameId?: number;
  mode?: MatchMode | null;
}

export interface Modal {
  modalName: ModalName;
  cancel?: Cancel;
  enroll?: Enroll;
  challenge?: Challenge;
  exp?: Exp;
  gameId?: number;
}
