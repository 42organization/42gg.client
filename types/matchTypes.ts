export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
}

export interface ManagedSlot extends Slot {
  startTime: string;
  endTime: string;
}

export type Slots = Slot[];

export interface MatchData {
  startTime: string;
  intervalMinute: number;
  type: string;
  matchBoards: Slots[];
}

export interface EnrollInfo {
  slotId: number;
  type: string;
  startTime: string;
  endTime: string;
}
