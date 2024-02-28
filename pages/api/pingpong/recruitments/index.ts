import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      title: '제 1기 모집',
      status: 'BEFORE',
      generation: '1기',
    },
    {
      id: 2,
      startDate: new Date(),
      endDate: new Date(),
      title: '제 2기 모집',
      status: 'RECRUITING',
      generation: '2기',
    },
    {
      id: 3,
      startDate: new Date(),
      endDate: new Date(),
      title: '제 3기 모집',
      status: 'AFTER',
      generation: '3기',
    },
  ]);
}
