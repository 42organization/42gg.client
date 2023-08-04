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
      'https://42gg-public-test-image.s3.ap-northeast-2.amazonaws.com/images/yoahn-1a995822-19d6-499a-a494-0a566395a64b.jpeg',
    isAttended: true,
    tierImageUri:
      'https://42gg-public-test-image.s3.ap-northeast-2.amazonaws.com/images/cheolee-69dec7cb-63ce-4d29-8591-c3ac83da7bf9.jpeg',
  };

  res.status(200).json(userData);
}
