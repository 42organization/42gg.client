import { Game } from './gameTypes';

export interface TournamentInfo {
  tournamentId: number;
  title: string;
  contents: string;
  status: string; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE'
  type: 'CUSTOM' | 'MASTER' | 'ROOKIE';
  winnerIntraId: string;
  winnerImageUrl: string;
  startTime: Date;
  endTime: Date;
  player_cnt: number;
}

export interface TournamentData {
  tournaments: TournamentInfo[];
  totalPage: number;
}

export interface TournamentGame {
  tournamentGameId: number;
  game: Game | null;
  status: string; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE'
  nextTournamentGameId: number | null;
}
