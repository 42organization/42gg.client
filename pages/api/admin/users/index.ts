import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user: any = [
    {
      userId: 5,
      intraId: 'jiyun',
      userImageUri:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jiyun.jpeg',
      racketType: 'penholder',
      statusMessage: 'hello',
      wins: 10,
      losses: 7,
      ppp: 1004,
      eMail: '42gg@42seoul.kr',
      roleType: 'ROLE_ADMIN',
    },
  ];
  res.status(200).json(user);
}
