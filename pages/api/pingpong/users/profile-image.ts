import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  if (method === 'POST') {
    const { receiptId, imgData } = body;
    console.log(receiptId, imgData);
    res.status(201).json({ receiptId, imgData });
    // res.status(400).end();
  }
}
