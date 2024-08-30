import { GameResult } from 'types/takgu/gameTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResult>
) {
  const GameResultData: GameResult = {
    beforeExp: 100,
    beforeMaxExp: 300,
    beforeLevel: 3,
    increasedExp: 200,
    increasedLevel: 4,
    afterMaxExp: 500,
    changedPpp: 100,
    beforePpp: 1000,
    beforeCoin: 3,
    afterCoin: 6,
    coinIncrement: 3,
  };

  res.status(200).json(GameResultData);
}
