import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { megaphoneId } = query as { megaphoneId: string };

  if (method === 'DELETE') {
    if (megaphoneId === undefined) {
      res.status(400).end('Bad Request');
      return;
    } else {
      if (parseInt(megaphoneId) < 5) res.status(204);
      else res.status(405).end(`Megaphone ${megaphoneId} Not Found`);
    }
  }
}
