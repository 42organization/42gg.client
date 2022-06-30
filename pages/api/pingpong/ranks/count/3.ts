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
        intraId: 'kipark',
        ppp: 100,
        statusMessage: '기요미 막내',
        winRate: 100,
      },
      {
        rank: 2,
        intraId: 'sujpark',
        ppp: 90,
        statusMessage: '멋쟁이 PM',
        winRate: 80,
      },
      {
        rank: 3,
        intraId: 'jabae',
        ppp: 80,
        statusMessage: '비쥬얼 리드',
        winRate: 60,
      },
    ],
  };
  res.status(200).json(obj);
}
