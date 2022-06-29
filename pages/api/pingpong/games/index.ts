// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Game, Team, Player } from 'types/gameTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    typeof req.query.pageParam !== 'string' ||
    typeof req.query.count !== 'string'
  ) {
    return;
  }
  const lastGameId = parseInt(req.query.pageParam);
  const count = parseInt(req.query.count);
  let i = 0;
  const players: Player[] = [
    {
      userId: 'kipark',
      userImageUri: 'imageUrl',
      wins: 1,
      losses: 2,
      winRate: 60,
      pppChange: 20,
    },
    {
      userId: 'jibae',
      userImageUri: 'imageUrl',
      wins: 4,
      losses: 2,
      winRate: 50,
      pppChange: 20,
    },
    {
      userId: 'sujpark',
      userImageUri: 'imageUrl',
      wins: 1422,
      losses: 122,
      winRate: 630,
      pppChange: 210,
    },
    {
      userId: 'jabae',
      userImageUri: 'imageUrl',
      wins: 1,
      losses: 1,
      winRate: 70,
      pppChange: 220,
    },
  ];

  const teams: Team[] = [
    {
      players: [players[0]], // kipark
      isWin: true,
      score: 2,
    },
    {
      players: [players[1]], // jibae
      isWin: false,
      score: 2,
    },
    {
      players: [players[2]], // sujpark
      isWin: true,
      score: 2,
    },
    {
      players: [players[3]], // jabae
      isWin: false,
      score: 2,
    },
  ];

  const games: Game[] = [
    {
      gameId: 1,
      time: '2022-06-28T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      gameId: 2,
      time: '2022-06-27T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 3,
      time: '2022-06-26T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 4,
      time: '2022-06-25T09:41:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 5,
      time: '2022-06-24T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      gameId: 6,
      time: '2022-06-10T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 7,
      time: '2022-06-07T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 8,
      time: '2022-06-02T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 9,
      time: '2022-05-28T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      gameId: 10,
      time: '2022-04-27T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 11,
      time: '2022-04-26T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 12,
      time: '2022-03-25T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 13,
      time: '2022-02-22T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      gameId: 14,
      time: '2022-05-20T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 15,
      time: '2022-01-17T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 16,
      time: '2021-12-15T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 17,
      time: '2021-11-10T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 18,
      time: '2021-10-07T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 19,
      time: '2021-09-05T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 20,
      time: '2020-05-01T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 21,
      time: '2020-05-01T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 22,
      time: '2019-05-01T11:48:34',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
  ];
  const gamese = games.filter(
    (item) => i++ < count + lastGameId && lastGameId < item.gameId
  );
  const objs = {
    lastGameId: lastGameId + count,
    games: gamese,
  };
  res.status(200).json(objs);
}
