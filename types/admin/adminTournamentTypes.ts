export interface ITournament {
  tournamentId: number;
  title: string;
  contents: string;
  status: 'BEFORE' | 'READY' | 'LIVE' | 'END';
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

export interface ITournamentEditInfo {
  tournamentId: number | null;
  title: string;
  contents: string;
  type: 'CUSTOM' | 'MASTER' | 'ROOKIE' | null;
  startTime: Date;
  endTime: Date;
}
