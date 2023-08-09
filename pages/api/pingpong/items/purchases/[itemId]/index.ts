import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { itemId } = req.query;
    res.status(201).json({ message: `${itemId} 구매 성공` });
  }
}
