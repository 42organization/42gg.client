import {
  Match,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { TournamentGame } from 'types/takgu/tournamentTypes';

/**
 * 매치가 수정 가능한 상태인지 판단하여 isModifiable 추가
 * @param {Match[]} matches 토너먼트 게임
 */
export const setModifiabilityFlag = (matches: Match[]) => {
  matches.forEach((match) => {
    match.isModifiable = false;
    if (
      match.state === 'LIVE' ||
      match.state === 'WAIT' ||
      match.state === 'END'
    ) {
      const nextMatch = matches.find(
        (nextMatch) => match.nextMatchId === nextMatch.id
      );
      if (!nextMatch) {
        match.isModifiable = true;
      } else if (nextMatch.state === 'BEFORE') {
        match.isModifiable = true;
      }
    }
  });
};

/**
 * 이전게임의 우승자를 다음 예상 게임의 참가자로 추가
 * @param {Match[]} matches 토너먼트 게임
 * */
export const addExpectedMatchParticipants = (matches: Match[]) => {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].participants.length < 2) {
      const beforeMatchs = matches.filter(
        (match) => match.nextMatchId === matches[i].id
      );

      beforeMatchs.forEach((beforeMatch) => {
        const winner = beforeMatch.participants.find(
          (participant) => participant.isWinner === true
        );
        if (winner) {
          const modifiedWinner = {
            ...winner,
            isWinner: false,
            resultText: null,
          };
          matches[i].participants.push(modifiedWinner);
        }
      });
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
  const { tournamentGameId, game, nextTournamentGameId } = tournamentGame;
  const { team1, team2 } = game ?? { team1: null, team2: null };

  const participantsTeam1: Participant[] = team1
    ? [
        {
          id: team1.teamId,
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
          id: team2.teamId,
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
    state: game ? game.status : 'BEFORE',
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
  setModifiabilityFlag(matchs);
  return matchs;
};
