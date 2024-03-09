import type { NextApiRequest, NextApiResponse } from 'next';

const fullRecruitments1 = {
  recruitments: [
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 1기',
      status: 'BEFORE',
      generation: '1기',
    },
    {
      id: 2,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 2기',
      status: 'RECRUITING',
      generation: '2기',
    },
    {
      id: 3,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 3기',
      status: 'AFTER',
      generation: '3기',
    },
  ],
  totalPage: 2,
};

const fullRecruitments2 = {
  recruitments: [
    {
      id: 4,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 4기',
      status: 'BEFORE',
      generation: '4기',
    },
    {
      id: 5,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 5기',
      status: 'RECRUITING',
      generation: '5기',
    },
    {
      id: 6,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 6기',
      status: 'AFTER',
      generation: '6기',
    },
  ],
  totalPage: 2,
};

const emptyRecruitments = {
  recruitments: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;
  if (page === '1') {
    res.status(200).json(fullRecruitments1);
    return;
  }
  if (page === '2') {
    res.status(200).json(fullRecruitments2);
    return;
  }
  res.status(200).json(fullRecruitments1);
  // res.status(200).json(emptyRecruitments);
}
