export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
  mode: string;
}

export type Slots = Slot[];

export interface CurrentMatch {
  slotId: number;
  time: string;
  isMatched: boolean;
  myTeam: string[];
  enemyTeam: string[];
}

export interface Match {
  intervalMinute: number;
  matchBoards: Slots[];
}
