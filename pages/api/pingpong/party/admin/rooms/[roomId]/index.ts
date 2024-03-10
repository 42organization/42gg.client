import { PartyRoomDetail } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoomDetail>
) {
  const templetes: PartyRoomDetail[] = [];

  for (let i = 1; i < 11; i++) {
    const date = new Date();
    const create = i;
    templetes.push({
      roomId: i,
      title: '파티룸 ' + i,
      categoryId: 1,
      currentPeople: 1,
      minPeople: 3,
      maxPeople: 5,
      dueDate: date,
      createDate: date,
      myNickname: create === 0 ? 'host' : 'guest' + create,
      hostNickname: 'host',
      content: 'content is good',
      roomStatus: 'open',
      roomUsers: [
        {
          roomUserId: 1,
          nickname: 'host',
        },
        {
          roomUserId: 2,
          nickname: 'guest1',
        },
        {
          roomUserId: 3,
          nickname: 'guest2',
        },
      ],
      comments: [
        {
          commentId: 1,
          nickname: 'host',
          content: 'not hidden',
          isHidden: false,
          createDate: date,
        },
        {
          commentId: 2,
          nickname: 'guest1',
          content: 'hidden',
          isHidden: true,
          createDate: date,
        },
        {
          commentId: 3,
          nickname: 'guest2',
          content: 'not hidden',
          isHidden: false,
          createDate: date,
        },
      ],
    });
  }

  const detail = templetes[0];
  res.status(200).json(detail);
}