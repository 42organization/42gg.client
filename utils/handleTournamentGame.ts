import {
  Match,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { TournamentGame } from 'types/tournamentTypes';

/**
 * 이전게임의 우승자를 다음 예상 게임의 참가자로 추가
 * @param {Match[]} matches 토너먼트 게임
 * */
export const addExpectedMatchParticipants = (matches: Match[]) => {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].participants.length === 0) {
      const beforeMatch = matches.find(
        (match) => match.nextMatchId === matches[i].id
      );
      const winner = beforeMatch?.participants.find(
        (participant) => participant.isWinner === true
      );
      if (winner) {
        const modifiedWinner = { ...winner, isWinner: true, resultText: null };
        matches[i].participants.push(modifiedWinner);
      }
    }
  }
};

/**
 * 토너먼트 게임데이터를 브래킷 게임 데이터로 변환
 * @param {TournamentGame} tournamentGame 토너먼트 게임
 * @return {Match}
 * */
export const convertTournamentGameToBracketMatch = (
  tournamentGame: TournamentGame
): Match => {
  const { tournamentGameId, game, status, nextTournamentGameId } =
    tournamentGame;
  const { team1, team2 } = game ?? { team1: null, team2: null };

  const participantsTeam1: Participant[] = team1
    ? [
        {
          id: team1.players.map((player) => player.intraId).join(' '),
          teamId: team1.teamId,
          resultText: team1.score?.toString(),
          isWinner: team1.isWin ?? false,
          name: team1.players.map((player) => player.intraId).join(' '),
          picture: team1.players[0].userImageUri,
        },
      ]
    : [];

  const participantsTeam2: Participant[] = team2
    ? [
        {
          id: team2.players.map((player) => player.intraId).join(' '),
          teamId: team2.teamId,
          resultText: team2.score?.toString() ?? null,
          isWinner: team2.isWin ?? false,
          name: team2.players.map((player) => player.intraId).join(' '),
          picture: team2.players[0].userImageUri,
        },
      ]
    : [];

  const participants = [...participantsTeam1, ...participantsTeam2];

  return {
    id: tournamentGameId,
    nextMatchId: nextTournamentGameId,
    startTime: tournamentGame.game ? tournamentGame.game.time.toString() : '',
    state: status,
    participants,
  };
};

/**
 * 토너먼트 게임데이터 리스트를 브래킷 게임 데이터 리스트로 변환
 * @param {TournamentGame[]} tournamentGames 토너먼트 게임
 * @return {Match[]}
 * */
export const convertTournamentGamesToBracketMatchs = (
  tournamentGames: TournamentGame[]
): Match[] => {
  const matchs = tournamentGames.map(convertTournamentGameToBracketMatch);

  addExpectedMatchParticipants(matchs);
  return matchs;
};
