export interface ITournament {
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

export interface ITournamentTable {
  tournamentList: ITournament[];
  totalPage: number;
  currentPage: number;
}
