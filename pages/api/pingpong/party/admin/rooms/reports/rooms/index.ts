import { PartyNoshowReport } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyNoshowReport[]>
) {
  const categorys: PartyNoshowReport[] = [
    {
      id: 1,
      reporterId: 'test',
      reporteeId: 'test',
      roomId: 1,
      message: 'test',
      createdAt: new Date(),
    },
    {
      id: 2,
      reporterId: 'test',
      reporteeId: 'test',
      roomId: 2,
      message: 'test',
      createdAt: new Date(),
    },
    {
      id: 3,
      reporterId: 'test',
      reporteeId: 'test',
      roomId: 3,
      message: 'test',
      createdAt: new Date(),
    },
  ];

  res.status(200).json(categorys);
}
