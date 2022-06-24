// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { RankData } from '../../../../../types/rankTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankData>
) {
  const obj = {
    myRank: 17,
    currentPage: 1,
    totalPage: 1,
    rankList: [
      {
        rank: 1,
        userId: 'kipark',
        ppp: 100,
        statusMessage: '기요미 막내',
        winRate: 100,
      },
      {
        rank: 2,
        userId: 'sujpakr',
        ppp: 90,
        statusMessage: '멋쟁이 PM',
        winRate: 80,
      },
      {
        rank: 3,
        userId: 'jabae',
        ppp: 80,
        statusMessage: '비쥬얼 리드',
        winRate: 60,
      },
    ],
  };
  res.status(200).json(obj);
}
