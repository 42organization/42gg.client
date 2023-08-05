import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  coinPolicyList: [
    {
      coinPolicyId: 2,
      createUser: 'hyungjpa',
      attendance: 3,
      normal: 5,
      rankWin: 7,
      rankLose: 4,
      createdAt: '2023-04-05 00:30:25',
    },
    {
      coinPolicyId: 1,
      createUser: 'hyungjpa',
      attendance: 1,
      normal: 2,
      rankWin: 3,
      rankLose: 4,
      createdAt: '2023-03-25 06:25:34',
    },
  ],
  totalPage: 2,
};

const testData2 = {
  coinPolicyList: [
    {
      coinPolicyId: 0,
      createUser: 'hyungjpa',
      attendance: 0,
      normal: 1,
      rankWin: 0,
      rankLose: 0,
      createdAt: '2023-08-05 10:10:10',
    },
  ],
  totalPage: 2,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };

  if (method === 'GET') {
    if (page === '1') res.status(200).json(testData1);
    else res.status(200).json(testData2);
  }
}
