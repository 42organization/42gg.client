import type { NextApiRequest, NextApiResponse } from 'next';

type NormalUserData = {
  intraId: string;
  rank: number;
  statusMessage: string;
  level: number;
  exp: number;
};

type NormalData = {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: NormalUserData[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const NormalUserData: NormalUserData[] = [
    {
      intraId: 'kim_takgu',
      rank: 1,
      statusMessage: '🏓🏓🏓🏓 42서울 최강 탁구왕 으하하하하 🏓🏓🏓🏓',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 2,
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 3,
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 4,
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 5,
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 6,
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
  ];
  const NormalData: NormalData = {
    myRank: 4,
    currentPage: 1,
    totalPage: 1,
    rankList: NormalUserData,
  };
  res.status(200).json(NormalData);
}
