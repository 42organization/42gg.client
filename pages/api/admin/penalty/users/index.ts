import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ! 빈 객체 체크 로직 필요
  if (req.query.intraId) {
    res
      .status(200)
      .json({ query: { ...req.query }, text: '패털티 받은 특정 유저 조회' });
  } else {
    res.status(200).json({ text: '패널티 전체 조회' });
  }
}
