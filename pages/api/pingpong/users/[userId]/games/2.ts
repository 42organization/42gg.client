// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Game, Team, Player } from '../../../../../../types/gameTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const info = {
    count: 16,
    next: 'http://localhost:3000/api/pingpong/users/kipark/games/1',
    pages: 4,
    prev: 'http://localhost:3000/api/pingpong/users/kipark/games/3',
  };
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
      wins: 14,
      losses: 12,
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
      gameId: 5,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      gameId: 6,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 7,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      gameId: 8,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
  ];
  const objs = {
    info: info,
    games: games,
  };
  res.status(200).json(objs);
}
