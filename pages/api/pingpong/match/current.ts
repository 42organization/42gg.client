// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CurrentMatch } from './../../../../types/matchTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentMatch>
) {
  const currentMatch: CurrentMatch = {
    slotId: 0,
    time: '2022-06-10 18:00',
    isMatched: true,
    myTeam: ['kipark', 'wochae'],
    enemyTeam: ['sujpark', 'jabae'],
  };
  res.status(200).json(currentMatch);
}
