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
  totalPage: 3,
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
      title: '긴 제목을 테스트!!!! 42GG 6기 ',
      status: 'AFTER',
      generation: '6기',
    },
  ],
  totalPage: 3,
};

const fullRecruitments3 = {
  recruitments: [
    {
      id: 7,
      startDate: new Date(),
      endDate: new Date(),
      title: '42GG 모집 7기 지원하기 테스트',
      status: 'BEFORE',
      generation: '7기',
    },
  ],
  totalPage: 3,
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
  if (page === '3') {
    res.status(200).json(fullRecruitments3);
    return;
  }

  res.status(200).json(fullRecruitments1);
  // res.status(200).json(emptyRecruitments);
}
