import { IUser } from './admin/adminUserTypes';

export interface TournamentInfo {
  tournamentId: number;
  title: string;
  contents: string;
  status: string; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE'
  type: 'custom' | 'master' | 'rookie';
  winner?: IUser;
  startTime: Date;
  endTime: Date;
  player_cnt: number;
}

export interface TournamentData {
  tournaments: TournamentInfo[];
  totalPage: number;
}
