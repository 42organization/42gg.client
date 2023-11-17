import { IUser } from './admin/adminUserTypes';

export interface TournamentInfo {
  tournamentId: number;
  title: string;
  contents: string;
  status: string; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE'
  type: 'CUSTOM' | 'MASTER' | 'ROOKIE';
  winnerUser?: IUser;
  startTime: Date;
  endTime: Date;
}

export interface TournamentData {
  tournaments: TournamentInfo[];
  totalPage: number;
}
