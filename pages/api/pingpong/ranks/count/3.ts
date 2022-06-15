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
        statusMessage: '까칠한 리드',
        winRate: 60,
      },
      {
        rank: 4,
        userId: 'jihyukim',
        ppp: 70,
        statusMessage: '돌아온 미국인',
        winRate: 42,
      },
      //   {
      //     rank: 5,
      //     userId: 'daekim5',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 6,
      //     userId: 'daekim6',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 7,
      //     userId: 'daekim7',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 8,
      //     userId: 'daekim8',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 9,
      //     userId: 'daekim9',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 10,
      //     userId: 'daekim10',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 11,
      //     userId: 'daekim11',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 12,
      //     userId: 'daekim12',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 13,
      //     userId: 'daekim13',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 14,
      //     userId: 'daekim14',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 15,
      //     userId: 'daekim15',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 16,
      //     userId: 'daekim16',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 17,
      //     userId: 'daekim17',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 18,
      //     userId: 'daekim18',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 19,
      //     userId: 'daekim19',
      //     ppp: 100,
      //     statusMessage: '프론트엔드 팀 최고',
      //     winRate: 1,
      //   },
      //   {
      //     rank: 20,
      //     userId: 'daekim20',
      //     ppp: 90,
      //     statusMessage: '백엔드 팀도 최고',
      //     winRate: 1,
      //   },
    ],
  };
  res.status(200).json(obj);
}
