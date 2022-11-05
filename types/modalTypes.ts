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

export interface Reload {
  getMatchHandler: () => void;
  getLiveHandler: () => void;
}
export interface Cancel {
  slotId: number;
  time: string;
  enemyTeam: string[];
  reload: Reload | null;
}

export interface Enroll {
  slotId: number;
  type: string;
  mode?: string;
  startTime: Date;
  endTime: Date;
  reload: Reload | null;
}

export interface Modal {
  modalName: ModalName;
  cancel?: Cancel;
  enroll?: Enroll;
  gameId?: number;
}
