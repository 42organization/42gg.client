import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types/mainType';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const userData: User = {
    intraId: 'sangmipa1',
    isAdmin: true,
    userImageUri: '/image/fallBackSrc.jpeg',
    tierImageUri: '/image/fallBackSrc.jpeg',
  };

  res.status(200).json(userData);
}
