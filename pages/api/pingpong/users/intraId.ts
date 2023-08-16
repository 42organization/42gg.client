import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileBasic } from 'types/userTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileBasic>
) {
  const ProfileBasicData: ProfileBasic = {
    intraId: 'sangmipa1',
    userImageUri: '/image/fallBackSrc.jpeg',
    racketType: 'PENHOLDER',
    statusMessage: '1231231313',
    level: 40,
    currentExp: 123,
    maxExp: 123,
    tierImageUri: '/image/fallBackSrc.jpeg',
    tierName: '무지개 탁구채',
    expRate: 123,
    edge: 'profile-edge0',
    snsNotiOpt: 'EMAIL',
  };

  res.status(200).json(ProfileBasicData);
}
