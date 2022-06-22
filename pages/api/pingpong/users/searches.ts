import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchData } from '../../../../types/mainType';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchData | object>
) {
  const obj = {
    users: ['jabae', 'sujpark', 'daekim', 'kipark', 'jihyukim'],
  };
  if (req.query.q !== '') res.status(200).json(obj);

  res.status(200).json(obj);
}
