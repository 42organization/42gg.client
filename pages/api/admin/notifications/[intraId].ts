import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { intraId, page } = req.query;
  res.status(200).json({ intraId, page });
}
