import { PartyRoom } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';
type roomId = {
  roomId: number;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoom[] | roomId>
) {
  const { method, query } = _req;
  console.log(query);

  const partyRooms: PartyRoom[] = [
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
      content: 'content is good',
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
      content: 'content is good',
      createDate: new Date(1995, 11, 17, 3, 24, 0),
    },
  ];

  if (method === 'GET') {
    res.status(200).json(partyRooms);
  } else if (method === 'POST') {
    res.status(200).json({ roomId: 1 } as roomId);
  }
}
