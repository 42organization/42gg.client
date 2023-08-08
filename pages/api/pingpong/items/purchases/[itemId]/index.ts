import { NextApiRequest, NextApiResponse } from 'next';
// import { Purchase } from 'types/itemTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(201).json({ message: 'post success' });
  console.log('req.body', req.body);
}
