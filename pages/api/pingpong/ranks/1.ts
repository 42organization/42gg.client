// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { RankData } from '../../../../types/rankTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankData>
) {
  const obj = {
    myRank: 17,
    currentPage: 1,
    totalPage: 5,
    rankList: [
      {
        rank: 1,
        intraId: 'daekim1',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 2,
        intraId: 'daekim2',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 3,
        intraId: 'daekim3',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 4,
        intraId: 'daekim4',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 5,
        intraId: 'daekim5',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 6,
        intraId: 'daekim6',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 7,
        intraId: 'daekim7',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 8,
        intraId: 'daekim8',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 9,
        intraId: 'daekim9',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 10,
        intraId: 'daekim10',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 11,
        intraId: 'daekim11',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 12,
        intraId: 'daekim12',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 13,
        intraId: 'daekim13',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 14,
        intraId: 'daekim14',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 15,
        intraId: 'daekim15',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 16,
        intraId: 'daekim16',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 17,
        intraId: 'daekim17',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 18,
        intraId: 'daekim18',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
      {
        rank: 19,
        intraId: 'daekim19',
        ppp: 100,
        statusMessage: '프론트엔드 팀 최고',
        winRate: 1,
      },
      {
        rank: 20,
        intraId: 'daekim20',
        ppp: 90,
        statusMessage: '백엔드 팀도 최고',
        winRate: 1,
      },
    ],
  };
  res.status(200).json(obj);
}
