import { MatchMode } from './mainType';

/**
 * 경기 후  스코어 입력시 쓰는 타입
 * */
export interface TeamScore {
  myTeamScore: number | '';
  enemyTeamScore: number | '';
}

export interface Player {
  intraId: string;
  userImageUri: string;
}
export interface Team {
  teamScore: number;
  teams: Player[];
}

export interface Players {
  myTeam: Team;
  enemyTeam: Team;
}

export interface AfterGame {
  gameId: number;
  mode: MatchMode | null;
  startTime: string;
  isScoreExist: boolean;
  matchTeamsInfo: Players;
}
