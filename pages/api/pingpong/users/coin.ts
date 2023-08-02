import type { NextApiRequest, NextApiResponse } from 'next';
import { ICoin } from 'types/userTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICoin>
) {
  const coin = 100;

  const coinData: ICoin = {
    coin: coin,
  };

  res.status(200).json(coinData);
}
