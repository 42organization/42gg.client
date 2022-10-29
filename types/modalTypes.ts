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
  slotId: number;
  time: string;
  enemyTeam: string[];
}

export interface Enroll {
  slotId: number;
  type: string;
  mode?: string;
  startTime: Date;
  endTime: Date;
}

export interface Modal {
  modalName: ModalName;
  cancelInfo?: Cancel;
  enrollInfo?: Enroll;
  gameId?: number;
}
