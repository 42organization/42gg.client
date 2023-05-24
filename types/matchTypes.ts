export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
  time: string;
  endTime: string;
  mode: string;
}

export type Slots = Slot[];

export interface CurrentMatch {
  startTime: 'yyyy-mm-ddThh:mm';
  endTime: 'yyyy-mm-ddThh:mm';
  isMatched: boolean;
  myTeam: string[];
  enemyTeam: string[];
  isImminent: boolean;
}

export interface Match {
  matchBoards: Slots[];
}
// export interface Slot {
//   slotId: number;
//   status: string;
//   headCount: number;
//   time: string;
//   endTime: string;
//   mode: string;
// }

// export type Slots = Slot[];

// export interface CurrentMatch {
//   slotId: number;
//   time: string;
//   isMatched: boolean;
//   myTeam: string[];
//   enemyTeam: string[];
//   isImminent: boolean;
// }

// export interface Match {
//   matchBoards: Slots[];
// }
