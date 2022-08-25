type MainModal = 'WELCOME';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT';

type FixedModal = 'AFTER_GAME';

type ModalName =
  | null
  | `MAIN-${MainModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`;

export interface CancelInfo {
  slotId: number;
  time: string;
  enemyTeam: string[];
}

export interface EnrollInfo {
  slotId: number;
  type: string;
  startTime: Date;
  endTime: Date;
}

export interface ModalInfo {
  modalName: ModalName;
  cancelInfo?: CancelInfo;
  enrollInfo?: EnrollInfo;
}
