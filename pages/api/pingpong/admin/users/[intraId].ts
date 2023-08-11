import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { intraId } = query as { intraId: string };

  if (method === 'DELETE') {
    if (
      intraId === 'hyungjpa' ||
      intraId === 'hyobicho' ||
      intraId === 'sangmipa' ||
      intraId === 'jeyoon'
    )
      res.status(200).end();
    else res.status(403).end();
  }
}
