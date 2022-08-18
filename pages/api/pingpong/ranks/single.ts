import type { NextApiRequest, NextApiResponse } from 'next';
import { RankData } from 'types/rankTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankData>
) {
  const query = req.query;
  const { count } = query;

  const objList = [
    {
      rank: 1,
      intraId: 'jabae',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 2,
      intraId: 'kipark',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 3,
      intraId: 'daekim',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 4,
      intraId: 'jiyun',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 5,
      intraId: 'nheo',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 6,
      intraId: 'hakim',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 7,
      intraId: 'donghyuk',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 8,
      intraId: 'sujpark',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 9,
      intraId: 'jihyukim',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
    {
      rank: 10,
      intraId: 'wochae',
      statusMessage: '왕!',
      ppp: 300,
      winrate: 500,
    },
  ];
  const obj = {
    myIntraId: 'jabae',
    myRank: 1,
    currentPage: 1,
    totalPage: 1,
    rankList: count ? objList.slice(0, 3) : objList,
  };
  res.status(200).json(obj);
}
