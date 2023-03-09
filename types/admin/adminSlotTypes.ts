export type EditedSchedule = {
  pastSlotTime: number;
  futureSlotTime: number;
  interval: number;
  openMinute: number;
};

export type Slots = {
  slotId: number;
  status: string;
  headCount: number;
  time: string;
  mode: string;
};

export type Slot = {
  status: string;
  time: number;
  slotId: string;
};

export type CurrentMatch = {
  matchBoards: Slots[][];
};

export type PreviewMatch = {
  matchBoards: Slot[][];
};

export type SlotPreviewProps = {
  scheduleInfo: EditedSchedule;
  lastHour: number;
  currentHour: number;
  futurePreview: number;
};

export type SlotCurrentProps = {
  slotInfo: CurrentMatch;
  scheduleInfo: EditedSchedule;
  firstHour: number;
  lastHour: number;
  currentHour: number;
  futurePreview: number;
};
