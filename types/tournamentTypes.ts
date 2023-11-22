export interface TournamentInfo {
  tournamentId: number;
  title: string;
  contents: string;
  status: string; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE'
  type: 'CUSTOM' | 'MASTER' | 'ROOKIE';
  winnerIntraId: string;
  winnerImageUrl: string;
  startTime: string;
  endTime: string;
  player_cnt: number;
}

export interface TournamentData {
  tournaments: TournamentInfo[];
  totalPage: number;
}
