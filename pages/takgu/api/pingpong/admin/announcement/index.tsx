import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({
      // past announce list
      text: 'get ok',
    });
  } else if (req.method === 'POST') {
    res.status(201).json({ text: 'post ok' });
    console.log('post body :\n', req?.body);
  } else if (req.method === 'PUT') {
    res.status(202).json({ text: ' delete(put) ok' });
    console.log('put body :\n', req?.body);
  }
}
