import { PartyGameTemplete } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyGameTemplete[]>
) {
  const templetes: PartyGameTemplete[] = [
    {
      gameTemplateId: 0,
      gameName: '테스트 게임',
      maxGamePeople: 3,
      minGamePeople: 1,
      maxGameTime: 60,
      minGameTime: 30,
      genre: '테스트 장르',
      difficulty: '어려움',
      summary: '게임 소개입니다.',
    },
    {
      gameTemplateId: 1,
      gameName: '테스트 게임2',
      maxGamePeople: 4,
      minGamePeople: 2,
      maxGameTime: 120,
      minGameTime: 60,
      genre: '테스트 장르2',
      difficulty: '쉬움',
      summary: '게임 소개입니다.2',
    },
    {
      gameTemplateId: 2,
      gameName: '테스트 게임3',
      maxGamePeople: 5,
      minGamePeople: 3,
      maxGameTime: 180,
      minGameTime: 90,
      genre: '테스트 장르3',
      difficulty: '보통',
      summary: '게임 소개입니다.3',
    },
  ];

  res.status(200).json(templetes);
}
