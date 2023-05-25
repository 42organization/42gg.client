export interface Slot {
  startTime: string;
  endTime: string;
  status: string;
}

export type Match = Slot[];

export interface CurrentMatch {
  startTime: string;
  endTime: string;
  isMatched: boolean;
  myTeam: string[];
  enemyTeam: string[];
  isImminent: boolean;
}

export type CurrentMatchList = CurrentMatch[];

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
