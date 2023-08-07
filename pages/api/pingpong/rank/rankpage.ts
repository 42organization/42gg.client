import type { NextApiRequest, NextApiResponse } from 'next';
import { Rank, RankUser } from 'types/rankTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rank>
) {
  const RankUserData: RankUser[] = [
    {
      intraId: 'hyungjpa',
      rank: 1,
      ppp: 1041,
      statusMessage: '',
      tierImageUri: '/image/fallBackSrc.jpeg',
    },
    {
      intraId: 'hyungjpa',
      rank: 2,
      ppp: 1041,
      statusMessage: '',
      tierImageUri: '/image/fallBackSrc.jpeg',
    },
    {
      intraId: 'hyungjpa',
      rank: 3,
      ppp: 1041,
      statusMessage: '',
      tierImageUri: '/image/fallBackSrc.jpeg',
    },
    {
      intraId: 'hyungjpa',
      rank: 4,
      ppp: 1041,
      statusMessage: '',
      tierImageUri: '/image/fallBackSrc.jpeg',
    },
    {
      intraId: 'hyungjpa',
      rank: 5,
      ppp: 1041,
      statusMessage: '',
      tierImageUri: '/image/fallBackSrc.jpeg',
    },
  ];

  const RankData: Rank = {
    myRank: 7,
    currentPage: 1,
    totalPage: 1,
    rankList: RankUserData,
  };

  res.status(200).json(RankData);
}
