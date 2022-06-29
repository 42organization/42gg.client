export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
  time: string;
}

export type Slots = Slot[];

export interface CurrentMatch {
  slotId: number;
  time: string;
  isMatched: boolean;
  myTeam: string[];
  enemyTeam: string[];
}

export interface MatchData {
  intervalMinute: number;
  matchBoards: Slots[];
}

export interface EnrollInfo {
  slotId: number;
  type: string;
  startTime: Date;
  endTime: Date;
}
