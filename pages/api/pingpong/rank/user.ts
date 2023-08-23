import { RankMain, userImages } from 'types/rankTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankMain>
) {
  const userImages: userImages[] = [
    {
      intraId: '1',
      userImageUri: '/image/fallBackSrc.jpeg',
      tierImageUri: '/image/fallBackSrc.jpeg',
      edge: 'COLOR2',
    },
    {
      intraId: '2',
      userImageUri: '/image/fallBackSrc.jpeg',
      tierImageUri: '/image/fallBackSrc.jpeg',
      edge: 'COLOR3',
    },
    {
      intraId: '3',
      userImageUri: '/image/fallBackSrc.jpeg',
      tierImageUri: '/image/fallBackSrc.jpeg',
      edge: 'COLOR4',
    },
  ];

  const RankData: RankMain = {
    rankList: userImages,
  };

  res.status(200).json(RankData);
}
