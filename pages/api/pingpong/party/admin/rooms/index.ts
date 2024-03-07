import { PartyRoom } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoom[]>
) {
  const partyRooms: PartyRoom[] = [
    {
      roomId: 1,
      title: '첫번째 방',
      categoryId: 1,
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      dueDate: '2024-03-02T22:00:00',
      createDate: '2024-03-02T22:00:00',
      roomStatus: 'OPEN',
      creatorIntraId: '테스트 작성자',
    },
    {
      roomId: 2,
      title: '2번째 방',
      categoryId: 2,
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      dueDate: '2024-03-02T22:00:00',
      createDate: '2024-03-02T22:00:00',
      roomStatus: 'FINISH',
      creatorIntraId: '테스트 작성자',
    },
  ];

  res.status(200).json(partyRooms);
}
