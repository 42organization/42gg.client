import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { intraId } = req.query;
  res.status(200).json({ intraId, text: '상세 조회' });
}
