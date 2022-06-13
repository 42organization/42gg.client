// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { RankData } from '../../../../types/rankTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankData>
) {
  const obj = {
    info: {
      count: 100,
      page: 5,
      next: `https://localhost:3000/api/pingpong/ranks/5`,
      previous: `https://localhost:3000/api/pingpong/ranks/3`,
    },
    rankList: [
      {
        rank: 61,
        userId: 'daekim61',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 62,
        userId: 'daekim62',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 63,
        userId: 'daekim63',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 64,
        userId: 'daekim64',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 65,
        userId: 'daekim65',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 66,
        userId: 'daekim66',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 67,
        userId: 'daekim67',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 68,
        userId: 'daekim68',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 69,
        userId: 'daekim69',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 70,
        userId: 'daekim70',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 71,
        userId: 'daekim71',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 72,
        userId: 'daekim72',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 73,
        userId: 'daekim73',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 74,
        userId: 'daekim74',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 75,
        userId: 'daekim75',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 76,
        userId: 'daekim76',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 77,
        userId: 'daekim77',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 78,
        userId: 'daekim78',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 79,
        userId: 'daekim79',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 80,
        userId: 'daekim80',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
    ],
  };
  res.status(200).json(obj);
}
