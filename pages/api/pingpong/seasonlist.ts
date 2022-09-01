import type { NextApiRequest, NextApiResponse } from 'next';
import { Seasons } from 'types/seasonTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Seasons>
) {
  const query = req.query;
  const { count } = query;

  const objList = {
    seasonList: [
      { id: 3, name: 'season3' },
      { id: 2, name: 'season2' },
      { id: 1, name: 'season1' },
    ],
  };
  res.status(200).json(objList);
}
