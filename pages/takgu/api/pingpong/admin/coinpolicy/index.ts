import { NextApiRequest, NextApiResponse } from 'next';
import { IcoinPolicyHistory } from 'types/admin/takgu/adminCoinTypes';

interface IcoinPolicyHistoryRes {
  coinPolicyList: Array<IcoinPolicyHistory>;
  totalPage: number;
}

const coinPolicyHistory1: IcoinPolicyHistory = {
  coinPolicyId: 1,
  createUserId: 'hyungjpa',
  attendance: 3,
  normal: 5,
  rankWin: 7,
  rankLose: 4,
  createdAt: new Date('2023-04-05 00:30:25'),
};

const coinPolicyHistory2: IcoinPolicyHistory = {
  coinPolicyId: 2,
  createUserId: 'hyobicho',
  attendance: 1,
  normal: 2,
  rankWin: 3,
  rankLose: 4,
  createdAt: new Date('2023-04-03 00:30:25'),
};

const coinPolicyHistory3: IcoinPolicyHistory = {
  coinPolicyId: 3,
  createUserId: 'sangmipa',
  attendance: 2,
  normal: 3,
  rankWin: 4,
  rankLose: 5,
  createdAt: new Date('2023-04-02 00:30:25'),
};

const coinPolicyHistory4: IcoinPolicyHistory = {
  coinPolicyId: 4,
  createUserId: 'jeyoon',
  attendance: 3,
  normal: 4,
  rankWin: 5,
  rankLose: 6,
  createdAt: new Date('2023-04-01 00:30:25'),
};

const coinPolicyHistory5: IcoinPolicyHistory = {
  coinPolicyId: 5,
  createUserId: 'hyungjpa',
  attendance: 6,
  normal: 7,
  rankWin: 7,
  rankLose: 4,
  createdAt: new Date('2023-03-21 00:30:25'),
};

const coinPolicyHistoryList: Array<IcoinPolicyHistory> = [
  coinPolicyHistory1,
  coinPolicyHistory2,
  coinPolicyHistory3,
  coinPolicyHistory4,
  coinPolicyHistory5,
];

const resEmpty: IcoinPolicyHistoryRes = {
  coinPolicyList: [],
  totalPage: 0,
};

const resOne: IcoinPolicyHistoryRes = {
  coinPolicyList: coinPolicyHistoryList.slice(0, 3),
  totalPage: 1,
};
const resTwo: IcoinPolicyHistoryRes = {
  coinPolicyList: coinPolicyHistoryList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { page } = query as { page: string };
  const { attendance, normal, rankWin, rankLose } = body as {
    attendance: string;
    normal: string;
    rankWin: string;
    rankLose: string;
  };

  // const temp: IcoinPolicyHistoryRes = resEmpty;
  // const temp: IcoinPolicyHistoryRes = resOne;
  const temp: IcoinPolicyHistoryRes = resTwo;

  const resData: IcoinPolicyHistoryRes = {
    coinPolicyList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (page) {
      if (parseInt(page) === resData.totalPage) {
        resData.coinPolicyList = temp.coinPolicyList.slice(0, 3);
      } else {
        resData.coinPolicyList = temp.coinPolicyList;
      }
    }
    res.status(200).json(resData);
  }
  if (method === 'POST') {
    console.log(attendance);
    if (
      parseInt(attendance) > 50 ||
      parseInt(normal) > 50 ||
      parseInt(rankWin) > 50 ||
      parseInt(rankLose) > 50
    )
      res.status(400).end();
    else res.status(201).end();
  }
}
