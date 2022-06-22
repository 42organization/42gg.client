import type { NextApiRequest, NextApiResponse } from 'next';
import { LiveData } from '../../../../types/mainType';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LiveData | object>
) {
  const obj = {
    notiCount: 9,
    event: 'match',
  };
  res.status(200).json(obj);
}
