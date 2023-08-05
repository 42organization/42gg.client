import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  coinPolicyList: [
    {
      coinPolicyId: '2',
      createUser: 'hyungjpa',
      attendance: '3',
      nomal: '5',
      rank_win: '7',
      rank_lose: '4',
      created_at: new Date(),
    },
    {
      coinPolicyId: '1',
      createUser: 'hyungjpa',
      attendance: '1',
      nomal: '2',
      rank_win: '3',
      rank_lose: '4',
      created_at: new Date(),
    },
  ],
  totalPage: 2,
};

const testData2 = {
  coinPolicyList: [
    {
      coinPolicyId: '0',
      createUser: 'hyungjpa',
      attendance: '0',
      nomal: '1',
      rank_win: '0',
      rank_lose: '0',
      created_at: new Date(),
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
