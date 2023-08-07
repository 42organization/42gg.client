import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types/mainType';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const userData: User = {
    intraId: 'sangmipa',
    isAdmin: true,
    userImageUri:
      '/Users/sangminpark/Desktop/42gg.client/public/image/fallBackSrc.jpeg',
    isAttended: true,
    tierImageUri:
      '/Users/sangminpark/Desktop/42gg.client/public/image/fallBackSrc.jpeg',
  };

  res.status(200).json(userData);
}
