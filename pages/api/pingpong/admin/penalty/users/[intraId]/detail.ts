import { NextApiRequest, NextApiResponse } from 'next';

interface IPenalty {
  intraId: string;
  penaltyTime: string;
  reason: string;
}

const penalties: IPenalty[] = [
  {
    intraId: 'mosong',
    penaltyTime: '2021-10-10 10:10:10',
    reason: '노쇼',
  },
  {
    intraId: 'mosong2',
    penaltyTime: '2021-10-10 10:10:12',
    reason: '노쇼2',
  },
  {
    intraId: 'mmmm',
    penaltyTime: '2021-10-10 10:30:12',
    reason: '기물파손',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { intraId } = query;

  if (method === 'GET') {
    const result: IPenalty[] = penalties.filter(
      (penalty) => penalty.intraId === intraId
    );
    if (result.length === 0) {
      res.status(404).end(`User ${intraId} Not Found`);
    } else res.status(200).json(result[0]);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
