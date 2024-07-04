import { Game, Player } from 'types/takgu/gameTypes';
import { TournamentGame } from 'types/takgu/tournamentTypes';

const dummyPlayers: Player[] = [
  {
    intraId: 'jaehyuki',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'joonhjeon',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'jincpark',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'happyCat',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'sweetMango',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'ppMaster',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'Macintosh',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
  {
    intraId: 'Born2Code',
    userImageUri: 'https://avatars.githubusercontent.com/u/93255519?v=4',
    level: Math.floor(Math.random() * 42),
  },
];

function createIncrementalIdGenerator(): () => number {
  let counter = 0;

  return function () {
    counter += 1;
    return counter;
  };
}

function pairGames(tournamentGames: TournamentGame[]): TournamentGame[][] {
  const filteredTournamentGames = tournamentGames.filter(
    (tournamentGame) => tournamentGame.nextTournamentGameId === null
  );

  const pairedGames: TournamentGame[][] = [];
  for (let i = 0; i < filteredTournamentGames.length; i += 2) {
    const pair: TournamentGame[] = [filteredTournamentGames[i]];

    if (i + 1 < filteredTournamentGames.length) {
      pair.push(filteredTournamentGames[i + 1]);
    }

    pairedGames.push(pair);
  }

  return pairedGames;
}

function findWinnerPlayers(pairedGames: TournamentGame[]) {
  const players: Player[] = [];

  pairedGames.forEach((game) => {
    if (game.game?.team1.isWin) players.push(game.game.team1.players[0]);
    else if (game.game?.team2.isWin) players.push(game.game.team2.players[0]);
  });

  return players;
}

function generateGame(
  player1: Player,
  player2: Player,
  generateIncrementalId: () => number
): Game {
  const score = Math.floor(Math.random() * 2) + 1;

  const game: Game = {
    gameId: generateIncrementalId(),
    status: 'END',
    mode: 'TOURNAMENT',
    time: '2023-11-30',

    team1: {
      teamId: generateIncrementalId(),
      players: [player1],
      isWin: score === 2 ? true : false,
      score: score,
    },
    team2: {
      teamId: generateIncrementalId(),
      players: [player2],
      isWin: score === 2 ? false : true,
      score: score === 2 ? Math.floor(Math.random() * 2) : 2,
    },
  };

  return game;
}

export default function generateTournamentGames() {
  const generateIncrementalId = createIncrementalIdGenerator();
  const tournamentGames: TournamentGame[] = [];

  for (let i = 0; i < 8; i += 2) {
    const tournamentGame: TournamentGame = {
      tournamentGameId: generateIncrementalId(),
      game: generateGame(
        dummyPlayers[i],
        dummyPlayers[i + 1],
        generateIncrementalId
      ),
      nextTournamentGameId: null,
    };
    tournamentGames.push(tournamentGame);
  }

  for (let i = 0; i < 2; i++) {
    const pairedTournamentGames = pairGames(tournamentGames);

    pairedTournamentGames.forEach((pairedGame) => {
      const players: Player[] = findWinnerPlayers(pairedGame);
      const nextTournamentGame: TournamentGame = {
        tournamentGameId: generateIncrementalId(),
        game: generateGame(players[0], players[1], generateIncrementalId),
        nextTournamentGameId: null,
      };
      pairedGame[0].nextTournamentGameId = nextTournamentGame.tournamentGameId;
      pairedGame[1].nextTournamentGameId = nextTournamentGame.tournamentGameId;
      tournamentGames.push(nextTournamentGame);
    });
  }
  return tournamentGames;
}
