export type EditedSchedule = {
  pastSlotTime: number;
  futureSlotTime: number;
  interval: number;
  openMinute: number;
  startTime: Date;
};

export type Slots = {
  startTime: string;
  endTime: string;
  status: string;
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
