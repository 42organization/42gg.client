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
      categoryId: 1,
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      roomStatus: 'open',
      dueDate: new Date(1995, 11, 17, 3, 24, 0),
      content: 'content is good',
      createDate: new Date(1995, 11, 17, 3, 24, 0),
    },
    {
      roomId: 2,
      title: '2번째 방',
      categoryId: 2,
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      roomStatus: 'finish',
      dueDate: new Date(1995, 11, 17, 3, 24, 0),
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
