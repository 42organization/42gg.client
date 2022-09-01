import type { NextApiRequest, NextApiResponse } from 'next';

interface Seasons {
  seasonList: string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Seasons>
) {
  const query = req.query;
  const { count } = query;

  const objList = { seasonList: ['season3', 'season2', 'season1'] };
  res.status(200).json(objList);
}
