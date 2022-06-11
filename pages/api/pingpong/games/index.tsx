// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Game, Team, Player } from '../../../../types/gameTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.count !== 'string')
    return res.status(500).json({ message: '잘못된 형식입니다' });
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
      matchId: 1,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[0],
      team2: teams[1],
    },
    {
      matchId: 2,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      matchId: 3,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
    {
      matchId: 4,
      time: '12시 30분',
      status: 'end',
      type: '단식',
      team1: teams[2],
      team2: teams[3],
    },
  ];
  const reqCounct = parseInt(req.query.count);
  const returnObjs = games.filter((game, i) => i < reqCounct);
  res.status(200).json(returnObjs);
}
