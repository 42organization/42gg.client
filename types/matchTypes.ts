export interface Slot {
  slotId: number;
  status: string;
  headCount: number;
}

export interface ManagedSlot extends Slot {
  startMin: number;
  endMin: number;
}
