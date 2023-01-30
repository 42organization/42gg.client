import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user: any = [
    {
      userId: 1,
      intraId: 'sungwook',
      userImageUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/sungwook.jpeg',
      racket_type: 'penholder',
      status_message: 'hello',
      wins: 10,
      losses: 7,
      ppp: 1004,
      e_mail: '42gg@42seoul.kr',
      role_type: 3,
    },
  ];
  res.status(200).json(user);
}
