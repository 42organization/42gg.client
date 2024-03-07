import { PartyGameTemplete } from 'types/partyTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PartyGameTemplete[]>
) {
  const template: PartyGameTemplete[] = [
    {
      gameTemplateId: 1,
      categoryId: 2,
      gameName: '스플렌더',
      maxGamePeople: 3,
      minGamePeople: 1,
      maxGameTime: 1,
      minGameTime: 1,
      genre: '추리',
      difficulty: '어려움',
      summary: '게임',
    },
    {
      gameTemplateId: 1,
      categoryId: 2,
      gameName: '스플렌더',
      maxGamePeople: 3,
      minGamePeople: 1,
      maxGameTime: 1,
      minGameTime: 1,
      genre: '추리',
      difficulty: '어려움',
      summary: '게임',
    },
    {
      gameTemplateId: 1,
      categoryId: 2,
      gameName: '스플렌더',
      maxGamePeople: 3,
      minGamePeople: 1,
      maxGameTime: 1,
      minGameTime: 1,
      genre: '추리',
      difficulty: '어려움',
      summary: '게임',
    },
  ];

  res.status(200).json(template);
}
