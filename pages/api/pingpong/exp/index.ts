import type { NextApiRequest, NextApiResponse } from 'next';

type NormalUserData = {
  intraId: string;
  rank: number;
  textColor: string;
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
      intraId: 'takgu_king',
      rank: 1,
      textColor: '#CDB4DB',
      statusMessage: '🏓🏓🏓🏓 42서울 최강 탁구왕 으하하하하 🏓🏓🏓🏓',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'takgu_king',
      rank: 2,
      textColor: '#FFC8DD',
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'takgu_king',
      rank: 3,
      textColor: '#FFAFCC',
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'kim_takgu',
      rank: 4,
      textColor: '#BDE0FE',
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'takgu_king',
      rank: 5,
      textColor: '#A2D2FF',
      statusMessage: '안녕하세요',
      level: 1,
      exp: 100,
    },
    {
      intraId: 'takgu_king',
      rank: 6,
      textColor: '#4062BB',
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
