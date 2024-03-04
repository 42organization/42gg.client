import { PartyRoomDetail, RoomStatus } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoomDetail>
) {
  const templetes: PartyRoomDetail[] = new Array(10);

  for (let i = 1; i < 11; i++) {
    const date = new Date();
    const create = i;
    templetes.push({
      roomId: i,
      title: '파티룸 ' + i,
      categoryId: 1,
      currentPeople: 3,
      minPeople: 3,
      maxPeople: 5,
      dueDate: date,
      createDate: date,
      myNickname: create === 1 ? 'host' : 'guest' + create,
      hostNickname: 'host',
      content: 'content is good',
      roomStatus:
        create % 4 === RoomStatus.WAITING
          ? RoomStatus.WAITING
          : create % 4 === RoomStatus.PLAYING
          ? RoomStatus.PLAYING
          : create % 4 === RoomStatus.END
          ? RoomStatus.END
          : RoomStatus.HIDDEN,
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
          content: 'not hidden입니다.',
          isHidden: false,
          createDate: date,
        },
        {
          commentId: 2,
          nickname: 'guest1',
          content: 'hidden 입니다.',
          isHidden: true,
          createDate: date,
        },
        {
          commentId: 3,
          nickname: 'guest2',
          content: 'not hidden 입니다.',
          isHidden: false,
          createDate: date,
        },
      ],
    });
  }

  const detail = templetes.filter(
    (room) =>
      _req.query.partyId !== undefined && room.roomId === +_req.query.partyId
  )[0];

  res.status(200).json(detail);
}
