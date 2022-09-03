import { Mode } from './mainType';
export interface CurrentGameInfo {
  gameId: number;
  mode: Mode;
  startTime: string;
  matchTeamsInfo: PlayersData;
}

export interface PlayerInfo {
  intraId: string;
  userImageUri: string;
}

export interface PlayersData {
  myTeam: PlayerInfo[];
  enemyTeam: PlayerInfo[];
}

export interface GameResult {
  myTeamScore: number | '';
  enemyTeamScore: number | '';
}
