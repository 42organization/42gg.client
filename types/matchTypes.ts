export interface Slot {
  startTime: string;
  endTime: string;
  status: string;
}

export interface Match {
  matchBoards: Slot[][];
}
export interface CurrentMatchListElement {
  startTime: string;
  endTime: string;
  isMatched: boolean;
  myTeam: string[];
  enemyTeam: string[];
  isImminent: boolean;
}

export interface CurrentMatchList {
  match: CurrentMatchListElement[];
}
