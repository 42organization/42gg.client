import { MatchMode } from './mainType';

const randomColors = [
  'BASIC',
  'COLOR1',
  'COLOR2',
  'COLOR3',
  'COLOR4',
  'COLOR5',
  'COLOR6',
  'COLOR7',
  'COLOR8',
  'COLOR9',
  'COLOR10',
  'COLOR11',
  'COLOR12',
  'COLOR13',
  'COLOR14',
  'COLOR15',
  'COLOR16',
] as const;

const backgroundColors = [
  'BASIC',
  'TRANQUIL',
  'WINDY',
  'BUPE',
  'MANGO',
  'MISTY MEADOW',
  'OPA',
  'DRACULA',
  'SEA BLIZZ',
  'MYSTIC',
  'THE STRAIN',
  'COOL SKY',
  'JODHPUR',
  'HAZEL',
  'RADAR',
  'ROYAL BLUE',
  'MEGATRON',
] as const;

export type RandomColors = (typeof randomColors)[number];

export type BackgroundColors = (typeof backgroundColors)[number];

export type ColorMode = MatchMode | RandomColors;
