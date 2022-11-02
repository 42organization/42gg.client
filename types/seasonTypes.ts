import { SeasonMode } from './mainType';

export interface Season {
  id: number;
  name: string;
}

export interface SeasonList {
  seasonMode: SeasonMode;
  seasonList: Season[];
}
