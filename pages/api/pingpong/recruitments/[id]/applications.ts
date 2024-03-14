import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recruitId } = req.query as { recruitId: string };

  if (req.method === 'POST') {
    console.log('recruitId => ', recruitId);
    console.log(req.body);
    res.status(201).send('Created');
    // 에러 응답 테스트용
    // res.status(400).send('Created');
  }
}
