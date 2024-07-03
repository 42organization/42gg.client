import { NextApiRequest, NextApiResponse } from 'next';
import { IGames } from 'types/admin/gameLogTypes';

interface IQuery {
  page: string;
  season?: string;
  q?: string;
  size?: string;
}

function generateGamelog(): IGames {
  const intraIds = ['mosong', 'rjeong', 'sungwook', 'daijeong'];
  const teamNumber = [1, 2];

  const teams = [
    {
      intraId1: intraIds[0],
      teamId: teamNumber[0],
      score: 10,
      win: true,
    },
    {
      intraId1: intraIds[1],
      teamId: teamNumber[1],
      score: 5,
      win: false,
    },
    {
      intraId1: intraIds[0],
      intraId2: intraIds[1],
      teamId: teamNumber[0],
      score: 10,
      win: true,
    },
    {
      intraId1: intraIds[2],
      intraId2: intraIds[3],
      teamId: teamNumber[1],
      score: 7,
      win: false,
    },
  ];

  const games: IGames = {
    gameLog: [
      {
        gameId: 1,
        startAt: new Date(),
        slotTime: '15분',
        mode: 'RANK',
        status: 'WAIT',
        team1: teams[0],
        team2: teams[1],
      },
      {
        gameId: 2,
        startAt: new Date(),
        slotTime: '15분',
        mode: 'RANK',
        status: 'BEFORE',
        team1: teams[1],
        team2: teams[0],
      },
      {
        gameId: 3,
        startAt: new Date(),
        slotTime: '30분',
        mode: 'RANK',
        status: 'LIVE',
        team1: teams[2],
        team2: teams[3],
      },
    ],
    totalPage: 1,
  };

  return games;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page, season = 0, q, size = 20 } = query as Partial<IQuery>;

  if (!page) return res.status(400).json({ message: 'page is required' });

  switch (method) {
    case 'GET':
      // 특정 유저의 게임 목록 조회
      if (q) {
        res.status(200).json(generateGamelog());
      }
      // 시즌별 / 전체 게임 목록 조회
      if (season) {
        res.status(200).json(generateGamelog());
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
