import type { NextApiRequest, NextApiResponse } from 'next';

const fullRecruitData = {
  recruitment: [
    {
      id: 1,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      title: '테스트 모집',
      status: '모집전',
      generation: '1기',
    },
    {
      id: 2,
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      title: '테스트 모집qqqqqqasdfasdasdvasvsadvasdvsadvasdvsavasvas',
      status: '모집중',
      generation: '2기',
    },
    {
      id: 3,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      title: '테스트 모집',
      status: '완료',
      generation: '3기',
    },
  ],
  totalPage: 3,
  currentPage: 1,
};

const emptyRecruitData = {
  recruitList: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fullRecruitData);
  // res.status(200).json(emptyRecruitData);
}
