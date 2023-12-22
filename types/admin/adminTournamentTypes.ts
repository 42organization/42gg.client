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
  playerCnt: number;
}

export interface ITournamentTable {
  tournamentList: ITournament[];
  totalPage: number;
  currentPage: number;
}

export interface ITournamentUser {
  userId: number;
  intraId: string;
  isJoined: boolean;
  resisteredDate?: Date;
}

export interface ITournamentEditInfo {
  tournamentId: number | null;
  title: string;
  contents: string;
  type: 'CUSTOM' | 'MASTER' | 'ROOKIE' | null;
  startTime: string;
  endTime: string;
}
