import { User } from 'types/mainType';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const userData: User = {
    intraId: 'kim_takgu',
    isAdmin: true,
    userImageUri:
      'https://cdn.pixabay.com/photo/2020/10/25/17/41/table-tennis-5685071_1280.jpg',
    isAttended: false,
    tierImageUri:
      'https://cdn.pixabay.com/photo/2022/07/29/05/52/table-tennis-7351159_1280.png',
    edge: 'COLOR8',
    tierName: '무지개 탁구채',
    level: 40,
  };
  res.status(200).json(userData);
}
