import { PartyRoomDetail } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoomDetail[]>
) {
  const templetes: PartyRoomDetail[] = [
    {
      roomId: 0,
      title: '테스트 게임',
      categoryId: 1,
      currentPeople: 3,
      minPeople: 1,
      maxPeople: 3,
      isHidden: false,
      isOver: false,
      dueDate: new Date(),
      createDate: new Date(),
      myNickname: 'test',
      hostNickname: 'test',
      roomUsers: [
        {
          roomUserId: 0,
          nickname: 'test',
        },
      ],
      comments: [
        {
          commentId: 0,
          nickname: 'test',
          content: '테스트 데이터입니다.',
          isHidden: false,
          createDate: new Date(),
        },
      ],
    },
    {
      roomId: 1,
      title: '테스트 게임2',
      categoryId: 2,
      currentPeople: 4,
      minPeople: 2,
      maxPeople: 4,
      isHidden: false,
      isOver: false,
      dueDate: new Date(),
      createDate: new Date(),
      myNickname: 'test',
      hostNickname: 'test',
      roomUsers: [
        {
          roomUserId: 1,
          nickname: 'test',
        },
      ],
      comments: [
        {
          commentId: 1,
          nickname: 'test',
          content: 'test',
          isHidden: false,
          createDate: new Date(),
        },
      ],
    },
    {
      roomId: 2,
      title: '테스트 게임3',
      categoryId: 3,
      currentPeople: 5,
      minPeople: 3,
      maxPeople: 5,
      isHidden: false,
      isOver: false,
      dueDate: new Date(),
      createDate: new Date(),
      myNickname: 'test',
      hostNickname: 'test',
      roomUsers: [
        {
          roomUserId: 2,
          nickname: 'test',
        },
      ],
      comments: [
        {
          commentId: 2,
          nickname: 'test',
          content: 'asdfasdfasdfasdfasdfasdfsadfasdfsadft',
          isHidden: false,
          createDate: new Date(),
        },
      ],
    },
  ];

  res.status(200).json(templetes);
}
