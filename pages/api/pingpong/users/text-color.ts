import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { method } = req;
  const { receiptId, color } = req.body;
  if (method === 'PATCH') {
    // res.status(204).end();
    res.status(200).json(`receiptId : ${receiptId}, color : ${color}`);
  }
}
