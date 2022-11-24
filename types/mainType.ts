export type MatchMode = 'normal' | 'rank' | 'challenge';
export type SeasonMode = 'normal' | 'rank' | 'both';

export interface User {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
}

export interface Live {
  notiCount: number;
  event: 'match' | 'game' | null;
  currentMatchMode: MatchMode | null;
}
