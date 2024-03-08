import { PartyRoom } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoom[]>
) {
  const joinedPartyRooms: PartyRoom[] = [
    {
      roomId: 1,
      title: '첫번째 방',
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      dueDate: new Date(1995, 11, 17, 3, 24, 0),
      isOver: false,
      isHidden: false,
      categoryId: 1,
      createDate: new Date(1995, 11, 17, 3, 24, 0),
    },
    {
      roomId: 2,
      title: '2번째 방',
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      dueDate: new Date(1995, 11, 17, 3, 24, 0),
      isOver: false,
      isHidden: false,
      categoryId: 2,
      createDate: new Date(1995, 11, 17, 3, 24, 0),
    },
  ];

  res.status(200).json(joinedPartyRooms);
}