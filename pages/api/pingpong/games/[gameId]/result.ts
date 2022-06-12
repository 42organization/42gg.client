import type { NextApiRequest, NextApiResponse } from 'next';
import { GameResult } from '../../../../../types/scoreTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse<GameResult | object>) {
  if (req.method === 'GET') {
    const obj = {
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
    res.status(200).json(obj);
  } else if (req.method === 'POST') {
    res.status(200).json({ message: '등록이 완료되었습니다.' });
  } else res.status(500).json({ message: '잘못된 요청입니다.' });
}
