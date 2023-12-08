import { GameMode } from './gameTypes';

export type MatchMode = 'NORMAL' | 'RANK' | 'BOTH';

export type SeasonMode = 'NORMAL' | 'RANK' | 'BOTH';

export interface User {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
  isAttended: boolean;
  tierImageUri: string;
  edgeType: string;
  tierName: string;
  level: number;
}

export interface Live {
  notiCount: number;
  event: 'match' | 'game' | null;
  currentGameMode: GameMode | null;
  gameId: number | null;
}
