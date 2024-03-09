import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recruitId } = req.query as { recruitId: string };

  if (req.method === 'POST') {
    console.log('recruitId => ', recruitId);
    console.log(req.body);
    res.status(201);
  }
}
