import { PartyCategory } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyCategory[]>
) {
  const categorys: PartyCategory[] = [
    {
      categoryId: 1,
      categoryName: '보드게임',
    },
    {
      categoryId: 2,
      categoryName: '콘솔게임',
    },
    {
      categoryId: 3,
      categoryName: '기타',
    },
  ];

  res.status(200).json(categorys);
}
