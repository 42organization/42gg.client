import type { NextApiRequest, NextApiResponse } from 'next';
import { CoinResult } from 'types/coinTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoinResult>
) {
  //const {method} = req;

  const bcoin = 3;
  const acoin = 3;
  const icoin = 3;

  const coinData: CoinResult = {
    beforeCoin: bcoin,
    afterCoin: acoin,
    coinIncrement: icoin,
  };

  //if (method == 'GET') {
  res.status(200).json(coinData);
  //}
}
