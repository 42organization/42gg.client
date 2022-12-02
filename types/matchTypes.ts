import { StaticImageData } from 'next/image';

export interface Opponent {
  intraId: string;
  nick: string;
  imageUrl: StaticImageData;
  detail: string[];
}
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
  mode: string;
}

export interface Match {
  intervalMinute: number;
  matchBoards: Slots[];
}
