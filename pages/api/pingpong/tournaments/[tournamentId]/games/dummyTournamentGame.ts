import { TournamentGame } from 'types/tournamentTypes';

export const dummyLiveTournamentGames = {
  games: [
    {
      tournamentGameId: 19753,
      game: null,
      status: 'SCHEDULED',
      nextTournamentGameId: null,
    },
    {
      tournamentGameId: 19754,
      game: null,
      status: 'SCHEDULED',
      nextTournamentGameId: 19753,
    },
    {
      tournamentGameId: 19755,
      game: {
        gameId: 1,
        status: 'END',
        mode: 'TOURNAMENT',
        time: '13',
        team1: {
          teamId: 1,
          players: [
            {
              intraId: 'CoKe BoYz',
              userImageUri:
                'https://avatars.githubusercontent.com/u/93255519?v=4',
              level: 3,
            },
          ],
          isWin: true,
          score: 2,
        },
        team2: {
          teamId: 2,
          players: [
            {
              intraId: 'Aids Team',
              userImageUri:
                'https://avatars.githubusercontent.com/u/93255519?v=4',
              level: 3,
            },
          ],
          isWin: false,
          score: 1,
        },
      },
      status: 'SCORE_DONE',
      nextTournamentGameId: 19754,
    },
    {
      tournamentGameId: 19756,
      nextTournamentGameId: 19754,
      status: 'RUNNING',
      game: null,
    },
    {
      tournamentGameId: 19757,
      nextTournamentGameId: 19753,
      status: 'SCHEDULED',
      game: null,
    },
    {
      tournamentGameId: 19758,
      nextTournamentGameId: 19757,
      status: 'SCHEDULED',
      game: null,
    },
    {
      tournamentGameId: 19759,
      nextTournamentGameId: 19757,
      status: 'SCHEDULED',
      game: {
        gameId: 1,
        status: 'LIVE',
        mode: 'TOURNAMENT',
        time: '13',
        team1: {
          teamId: 3,
          players: [
            {
              intraId: 'BLUEJAYS',
              userImageUri:
                'https://avatars.githubusercontent.com/u/93255519?v=4',
              level: 3,
            },
          ],
        },
        team2: {
          teamId: 4,
          players: [
            {
              intraId: 'Bosphorus',
              userImageUri:
                'https://avatars.githubusercontent.com/u/93255519?v=4',
              level: 3,
            },
          ],
        },
      },
    },
  ],
};
