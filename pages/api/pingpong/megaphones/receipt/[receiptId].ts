import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { receiptId } = query as { receiptId: string };

  if (method === 'GET') {
    if (receiptId === '1')
      res.status(200).json({
        megaphoneId: 1,
        content: '42gg 확성기는 이제 모두 제겁니다.',
      });
    else if (receiptId === '3') {
      res.status(200).json({
        megaphoneId: 3,
        content: '이 확성기는 삭제가 불가능합니다.',
      });
    } else res.status(404).json({ message: receiptId });
  }
}
