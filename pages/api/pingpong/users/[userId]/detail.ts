// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileInfo } from '../../../../../types/userTypes';

const profile = {
  intraId: '',
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
    if (typeof req.query.intraId !== 'string')
      return res.status(400).json({ message: '잘못된 아이디 입니다' });
    profile.intraId = req.query.intraId;
    res.status(200).json(profile);
  } else res.status(400).json({ message: '잘못된 접근입니다' });
}
