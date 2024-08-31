import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { itemId } = req.query;
    res.status(201).json({ message: `${itemId}번 아이템 보내기 성공` });
  }
}
