import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as {
    id: string;
  };

  const recruitId = parseInt(id);

  if (req.method === 'POST') {
    console.log('POST SUCCESS, id => ', recruitId);
    console.log(req.body);
    res.status(201).send('Created');
  }
}
