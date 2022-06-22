// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileInfo } from '../../../../types/userTypes';

let profile = {
  userId: '',
  userImageUri: '',
  rank: 3,
  ppp: 500,
  wins: 120,
  loses: 30,
  winRate: '80%',
  racketType: 'shakehand',
  statusMessage: '곧 1등',
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileInfo | object>
) {
  if (req.method === 'GET') {
    if (typeof req.query.userId !== 'string')
      return res.status(400).json({ message: '잘못된 아이디 입니다' });
    profile.userId = req.query.userId;
    res.status(200).json(profile);
  } else if (req.method === 'POST') {
    profile = { ...profile, ...req.body };
    res.status(200).json({ message: '변경이 완료되었습니다.' });
  } else res.status(400).json({ message: '잘못된 접근입니다' });
}
