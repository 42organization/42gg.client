export interface ITournament {
  title: string; //제목
  content: string; //내용
  startTime: Date; //시작시간
  endTime: Date; // 종료시간
  tournamentType: 'CUSTOM' | 'ROOKIE' | 'MASTER'; //토너먼트 타입
  count?: number; //참여인원 (최대참여인원 8명 fix)
}

export interface ITournamentTable {
  tournamentList: ITournament[];
  totalPage: number;
  currentPage: number;
}
