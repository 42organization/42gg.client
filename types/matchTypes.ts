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
  startTime: Date;
  endTime: Date;
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
