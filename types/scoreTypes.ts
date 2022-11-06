import { MatchMode, SeasonMode } from './mainType';

/**
 * 경기 후  스코어 입력시 쓰는 타입
 * */
export interface AfterGame {
  gameId: number;
  mode: MatchMode | null;
  startTime: string;
  isScoreExist: boolean;
  matchTeamsInfo: Players;
}

export interface Players {
  myTeam: Team;
  enemyTeam: Team;
}

export interface Team {
  teamScore: number;
  teams: Player[];
}

export interface Player {
  intraId: string;
  userImageUri: string;
}

export interface TeamScore {
  myTeamScore: number | '';
  enemyTeamScore: number | '';
}
