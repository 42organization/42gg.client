import type { NextApiRequest, NextApiResponse } from 'next';
import { NotiList } from '../../../../types/notiTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotiList | object>
) {
  if (req.method === 'GET') {
    const obj = {
      noti: [
        {
          id: 1,
          type: 'matched',
          time: '2022-06-28T09:00:00',
          isChecked: false,
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 2,
          type: 'canceledByMan',
          time: '2022-06-28T12:00:00',
          isChecked: false,
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 3,
          type: 'canceledByTime',
          time: '2022-06-28T12:00:00',
          isChecked: false,
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 4,
          type: 'imminent',
          time: '2022-06-28T11:50:00',
          isChecked: false,
          myTeam: ['jabae'],
          enemyTeam: ['sujpark'],
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 5,
          type: 'announce',
          message: '탁구대 망가짐으로 1시간 동안 경기가 불가합니다',
          isChecked: true,
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 6,
          type: 'matched',
          time: '2022-06-28T12:00:00',
          isChecked: true,
          createdAt: '2022-06-28T11:48:34',
        },
        {
          id: 7,
          type: 'canceledByMan',
          time: '2022-06-28T12:00:00',
          isChecked: true,
          createdAt: '2022-06-28T11:48:34',
        },
      ],
    };
    res.status(200).json(obj);
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: '삭제가 완료되었습니다.' });
  } else res.status(400).json({ message: '잘못된 요청입니다.' });
}
