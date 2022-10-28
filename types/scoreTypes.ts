import { MatchMode } from './mainType';

/**
 * 경기 후  스코어 입력시 쓰는 타입
 * */
export interface AfterGame {
  gameId: number;
  mode: MatchMode;
  startTime: string;
  matchTeamsInfo: Players;
}

export interface Player {
  intraId: string;
  userImageUri: string;
}

export interface Players {
  myTeam: Player[];
  enemyTeam: Player[];
}

export interface TeamScore {
  myTeamScore: number | '';
  enemyTeamScore: number | '';
}
