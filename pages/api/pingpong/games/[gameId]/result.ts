import type { NextApiRequest, NextApiResponse } from 'next';
import { GameResult } from '../../../../../types/scoreTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResult | object | number>
) {
  if (req.method === 'GET') {
    const gamePlayers = {
      myTeam: [
        {
          userId: 'jihyukim',
          userImageUri: '/vercel.svg',
        },
      ],
      enemyTeam: [
        {
          userId: 'daekim',
          userImageUri: '/vercel.svg',
        },
      ],
    };
    res.status(200).json(gamePlayers);
  } else if (req.method === 'POST') {
    res.status(201).json({ status: res.status });
  } else res.status(400).json({ message: '잘못된 요청입니다.' });
}
