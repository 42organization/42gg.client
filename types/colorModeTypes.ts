import { MatchMode } from './mainType';

export type BackgroundColor =
  | 'BASIC'
  | 'COLOR1'
  | 'COLOR2'
  | 'COLOR3'
  | 'COLOR4'
  | 'COLOR5'
  | 'COLOR6'
  | 'COLOR7'
  | 'COLOR8'
  | 'COLOR9'
  | 'COLOR10'
  | 'COLOR11'
  | 'COLOR12'
  | 'COLOR13'
  | 'COLOR14'
  | 'COLOR15'
  | 'COLOR16';

export type ColorMode = MatchMode | BackgroundColor;
