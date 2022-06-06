import type { NextApiRequest, NextApiResponse } from 'next';
import { NotiData } from '../../../../types/notiTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse<NotiData[]>) {
  const obj = [
    { id: 1, type: 'matched', time: '09:10', isChecked: false, createdAt: '2021-06-06' },
    { id: 2, type: 'cancledByMan', time: '09:10', isChecked: false, createdAt: '2021-06-06' },
    { id: 3, type: 'cancledByTime', time: '09:10', isChecked: false, createdAt: '2021-06-06' },
    { id: 4, type: 'imminent', time: '09:10', isChecked: false, myTeam: ['jabae'], enemyTeam: ['sujpark'], createdAt: '2021-06-06' },
    { id: 5, type: 'announce', message: '탁구대 망가짐으로 1시간 동안 경기가 불가합니다', isChecked: true, createdAt: '2021-06-06' },
    { id: 6, type: 'matched', time: '09:10', isChecked: true, createdAt: '2021-06-06' },
    { id: 7, type: 'cancledByMan', time: '09:10', isChecked: true, createdAt: '2021-06-06' },
  ];
  res.status(200).json(obj);
}
