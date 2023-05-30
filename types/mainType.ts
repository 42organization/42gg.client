export type MatchMode = 'normal' | 'rank';
export type SeasonMode = 'normal' | 'rank' | 'both';

export interface User {
  intraId: string;
  isAdmin: boolean;
  userImageUrl: string;
}

export interface Live {
  notiCount: number;
  event: 'match' | 'game' | null;
  currentMatchMode: MatchMode | null;
  gameId: number;
}
