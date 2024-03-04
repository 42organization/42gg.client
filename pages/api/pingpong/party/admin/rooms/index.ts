import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const partyRooms = [
    {
      roomId: 1,
      title: '첫번째 방',
      categoryId: 1,
      currentPeople: 1,
      minPeople: 1,
      maxPeople: 4,
      dueDate: '2024-03-02T22:00:00',
      createDate: '2024-03-02T22:00:00',
      roomStatus: 'open',
      creator: {
        userId: 1,
        intraId: '테스트 작성자',
      },
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
      roomStatus: 'finish',
      creator: {
        userId: 2,
        intraId: '테스트 작성자2',
      },
    },
  ];

  res.status(200).json(partyRooms);
}
