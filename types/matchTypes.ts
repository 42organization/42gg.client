export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
}

export interface ManagedSlot extends Slot {
  startMin: number;
  endMin: number;
}

type Slots = Slot[];

export interface MatchData {
  startTime: string;
  intervalMinute: number;
  type: string;
  matchBoards: Slots[];
}
