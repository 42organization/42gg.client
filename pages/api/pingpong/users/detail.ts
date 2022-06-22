// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === 'PUT') {
    res.status(200).json({ message: '변경이 완료되었습니다.' });
  } else res.status(400).json({ message: '잘못된 접근입니다' });
}
