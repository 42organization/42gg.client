import type { NextApiRequest, NextApiResponse } from 'next';

type RankUserData = {
  intraId: string;
  rank: number;
  textColor: string;
  ppp: number;
  tierImageUri: string;
  statusMessage: string;
};

type RankData = {
  myRank: number;
  currentPage: number;
  totalPage: number;
  rankList: RankUserData[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const RankUserData: RankUserData[] = [
    {
      intraId: 'takgu_king',
      rank: 1,
      textColor: '#000000',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '🏓🏓🏓🏓 42서울 최강 탁구왕 🏓🏓🏓🏓',
    },
    {
      intraId: 'takgu_king',
      rank: 2,
      textColor: '#F1F7B5',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '안녕하세요',
    },
    {
      intraId: 'takgu_king',
      rank: 3,
      textColor: '#A8D1D1',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '안녕하세요',
    },
    {
      intraId: 'takgu_king',
      rank: 4,
      textColor: '#c9a5e6',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '안녕하세요',
    },
    {
      intraId: 'takgu_king',
      rank: 5,
      textColor: '#9EA1D4',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '',
    },
    {
      intraId: 'takgu_king',
      rank: 6,
      textColor: '#F1F7B5',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '',
    },
    {
      intraId: 'kim_takgu',
      rank: 7,
      textColor: '#A8D1D1',
      ppp: 1000,
      tierImageUri:
        'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
      statusMessage: '',
    },
  ];

  const RankData: RankData = {
    myRank: 7,
    currentPage: 1,
    totalPage: 1,
    rankList: RankUserData,
  };

  res.status(200).json(RankData);
}
