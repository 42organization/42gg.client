import type { NextApiRequest, NextApiResponse } from 'next';
import { UserData } from '../../../../types/mainType';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData>
) {
  const obj = {
    userId: 'jabae',
    userImageUri: '/vercel.svg',
    notiCount: 4,
    userState: { isPlaying: false, gameId: 3 },
  };
  res.status(200).json(obj);
}
