import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { intraId, change, content } = req.body;
  console.log(`intraId: ${intraId}, change: ${change}, content: ${content}`);
  res.status(204).end();
}
