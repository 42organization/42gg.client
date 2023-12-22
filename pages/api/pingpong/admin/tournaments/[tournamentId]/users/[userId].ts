import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).end('허용되지 않는 메소드입니다.');
    return;
  }
  const { userId } = req.query;
  if (userId !== 'jincpark' && userId !== 'junhjeon' && userId !== 'jaehyuki') {
    res.status(404).end('존재하지 않는 유저입니다.');
  }
  res.status(204).end('명단에서 유저 삭제 성공');
}
