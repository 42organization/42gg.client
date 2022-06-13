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
      next: String(null),
      previous: `https://localhost:3000/api/pingpong/ranks/4`,
    },
    rankList: [
      {
        rank: 81,
        userId: 'daekim81',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 82,
        userId: 'daekim82',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 83,
        userId: 'daekim83',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 84,
        userId: 'daekim84',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 85,
        userId: 'daekim85',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 86,
        userId: 'daekim86',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 87,
        userId: 'daekim87',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 88,
        userId: 'daekim88',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 89,
        userId: 'daekim89',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 90,
        userId: 'daekim90',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 91,
        userId: 'daekim91',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 92,
        userId: 'daekim92',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 93,
        userId: 'daekim93',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 94,
        userId: 'daekim94',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 95,
        userId: 'daekim95',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 96,
        userId: 'daekim96',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 97,
        userId: 'daekim97',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 98,
        userId: 'daekim98',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 99,
        userId: 'daekim99',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 100,
        userId: 'daekim100',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
    ],
  };
  res.status(200).json(obj);
}
