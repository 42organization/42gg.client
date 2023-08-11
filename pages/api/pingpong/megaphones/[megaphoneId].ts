import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { megaphoneId } = query as { megaphoneId: string };

  if (method === 'DELETE') {
    if (megaphoneId === '1') res.status(204).end();
    else res.status(403).end();
  }
}
