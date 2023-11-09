export interface ITournament {
  tournamentName: string;
  content: string;
  startTime: Date;
  endTime: Date;
  tournamentType: 'CUSTOM' | 'ROOKIE' | 'MASTER';
}

export interface ITournamentTable {
  tournamentList: ITournament[];
  totalPage: number;
  currentPage: number;
}
