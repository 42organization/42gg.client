import type { NextApiRequest, NextApiResponse } from 'next';
import { ICoinHistory, ICoinHistoryList, ICoin } from 'types/userTypes';

const coin = 100;

const coinData: ICoin = {
  coin: coin,
};

function createCoinHistoryReq(useCoinList: ICoinHistory[], totalPage: number) {
  const res: ICoinHistoryList = {
    useCoinList: useCoinList,
    totalPage: totalPage,
  };
  return res;
}

const coinTrans1: ICoinHistory = {
  history: '출석',
  amount: 1,
  createdAt: new Date('2023-08-07 15:57:25.23422'),
};

const coinTrans2: ICoinHistory = {
  history: '일반게임 참가',
  amount: 3,
  createdAt: new Date('2023-08-06 15:57:25.11111'),
};

const coinTrans3: ICoinHistory = {
  history: '확성기 구매',
  amount: -42,
  createdAt: new Date('2023-08-06 15:57:25.000342'),
};

const coinTrans4: ICoinHistory = {
  history: '랭크게임 승리',
  amount: 5,
  createdAt: new Date('2023-03-31 00:30:25.123121'),
};

const coinTrans5: ICoinHistory = {
  history: '프로필사진 변경권 구매',
  amount: -50,
  createdAt: new Date('2023-03-31 00:30:25.0004324'),
};

const coinTrans6: ICoinHistory = {
  history: '출석',
  amount: 1,
  createdAt: new Date('2023-03-25 00:30:25.132312'),
};

const coinTrans7: ICoinHistory = {
  history: '출석',
  amount: 1,
  createdAt: new Date('2023-03-22 00:30:25.25323'),
};

const coinTrans8: ICoinHistory = {
  history: '프로필 이미지띠 구매',
  amount: -10,
  createdAt: new Date('2023-03-21 00:30:25.1324'),
};

const coinTrans9: ICoinHistory = {
  history: '출석',
  amount: 1,
  createdAt: new Date('2023-03-11 00:30:25.34324'),
};

const coinTrans10: ICoinHistory = {
  history: '출석',
  amount: 1,
  createdAt: new Date('2023-03-01 00:30:25.43464'),
};

const CoinHistoryList: ICoinHistory[] = [
  coinTrans1,
  coinTrans2,
  coinTrans3,
  coinTrans4,
  coinTrans5,
  coinTrans6,
  coinTrans7,
  coinTrans8,
  coinTrans9,
  coinTrans10,
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, size } = req.query;

  if (page && size) {
    // TEST : slice로 리스트 자르기 (10 넣으면 빈배열) && page 숫자 변경해서 테스트 가능
    const TotalCoinHistory = createCoinHistoryReq(CoinHistoryList.slice(0), 1);
    res.status(200).json(TotalCoinHistory);
  } else {
    res.status(200).json(coinData);
  }
}
