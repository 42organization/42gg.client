import type { NextApiRequest, NextApiResponse } from 'next';
import { CoinResult } from 'types/coinTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoinResult>
) {
  const bcoin = 3;
  const acoin = 9;
  const icoin = 6;

  const coinData: CoinResult = {
    beforeCoin: bcoin,
    afterCoin: acoin,
    coinIncrement: icoin,
  };

  res.status(200).json(coinData);
}
