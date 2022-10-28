export type MatchMode = 'normal' | 'rank';
export type RecordMode = 'normal' | 'rank' | 'both';

export interface User {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
  seasonMode: RecordMode;
}

export interface Live {
  notiCount: number;
  event: 'match' | 'game' | null;
  seasonMode: RecordMode;
  currentMatchMode: MatchMode | null;
}
