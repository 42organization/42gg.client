export type MatchMode = 'normal' | 'rank';

export type SeasonMode = 'NORMAL' | 'RANK' | 'BOTH';

export interface User {
  intraId: string;
  isAdmin: boolean;
  userImageUrl: string;
}

export interface Live {
  notiCount: number;
  event: 'match' | 'game' | null;
  currentMatchMode: MatchMode | null;
  gameId: number | null;
}
