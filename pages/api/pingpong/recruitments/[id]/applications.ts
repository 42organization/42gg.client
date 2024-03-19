import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === 'POST') {
    console.log('id => ', id);
    console.log(req.body);
    res.status(201).send('Created');
    // 에러 응답 테스트용
    // res.status(400).send('Created');
  }
}
