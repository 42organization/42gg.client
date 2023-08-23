import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  if (method === 'POST') {
    console.log(body);
    res.status(201).end();
    // res.status(400).end();
  }
}
