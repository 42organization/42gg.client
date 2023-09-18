import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { intraId, change, content } = req.body;

  res.status(204).json({
    text: `intraId: ${intraId}, change: ${change}, content: ${content}`,
  });
}
