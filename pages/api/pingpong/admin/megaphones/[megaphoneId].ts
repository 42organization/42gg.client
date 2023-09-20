import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { megaphoneId } = query as { megaphoneId: string };

  if (method === 'DELETE') {
    if (
      megaphoneId === '1' ||
      megaphoneId === '2' ||
      megaphoneId === '3' ||
      megaphoneId === '4'
    )
      res.status(204).end();
    else res.status(403).end();
  }
}
