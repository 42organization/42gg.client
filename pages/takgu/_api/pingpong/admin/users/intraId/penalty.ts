import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user: any = [
    {
      userId: 2,
      intraId: 'daijeong',
      reason: 'No Show',
      penaltyHour: 3,
      penaltyMinute: 20,
    },
  ];
  res.status(200).json(user);
}
