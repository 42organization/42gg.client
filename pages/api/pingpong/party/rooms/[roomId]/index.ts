import { PartyRoomDetail, PartyRoomStatus } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyRoomDetail>
) {
  const templetes: PartyRoomDetail[] = [];
  const roomStatus: PartyRoomStatus[] = ['HIDDEN', 'OPEN', 'START', 'FINISH'];

  for (let i = 1; i < 11; i++) {
    const date = new Date().toString();
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
      roomStatus: roomStatus[i % 4],
      roomUsers: [
        {
          userRoomId: 1,
          nickname: 'host',
          intraId: 'juha',
          intraImg: `https://avatars.githubusercontent.com/u/68673565?v=4`,
        },
        {
          userRoomId: 2,
          nickname: 'guest1',
          intraId: 'wojeong',
          intraImg: null,
        },
        {
          userRoomId: 3,
          nickname: 'guest2',
          intraId: 'jeywon',
          intraImg: null,
        },
      ],
      comments: [
        {
          commentId: 1,
          nickname: 'host',
          content: 'host comment달았어요',
          isHidden: false,
          createDate: new Date(),
        },
        {
          commentId: 2,
          nickname: 'guest1',
          content: 'guest1 comment달았어요',
          isHidden: true,
          createDate: new Date(),
        },
        {
          commentId: 3,
          nickname: 'hello world',
          content: 'hello world comment달았어요',
          isHidden: false,
          createDate: new Date(),
        },
      ],
    });
  }

  const detail = templetes.find(
    (data) => _req.query.roomId === data.roomId.toString()
  );

  res.status(200).json(detail);
}
