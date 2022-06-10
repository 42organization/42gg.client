// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchData } from './../../../../../types/matchTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchData | object>
) {
  if (req.method === 'GET') {
    const today = '2022-06-10';
    const s = 17;
    const obj = {
      intervalMinute: 10,
      type: 'single',
      currentMatch: {
        slotId: 0,
        time: '2022-06-10 18:00',
        isMatch: true,
        enemyTeam: ['sujpark', 'jabae'],
      },
      matchBoards: [
        [
          { status: 'open', slotId: 0, headCount: 1, time: `${today} ${s}:00` },
          {
            status: 'close',
            slotId: 1,
            headCount: 1,
            time: `${today} ${s}:10`,
          },
          { status: 'open', slotId: 2, headCount: 0, time: `${today} ${s}:20` },
          { status: 'open', slotId: 3, headCount: 1, time: `${today} ${s}:30` },
          {
            status: 'close',
            slotId: 4,
            headCount: 2,
            time: `${today} ${s}:40`,
          },
          { status: 'open', slotId: 5, headCount: 1, time: `${today} ${s}:50` },
        ],
        [
          {
            status: 'open',
            slotId: 10,
            headCount: 1,
            time: `${today} ${s + 1}:00`,
          },
          {
            status: 'close',
            slotId: 11,
            headCount: 1,
            time: `${today} ${s + 1}:10`,
          },
          {
            status: 'open',
            slotId: 12,
            headCount: 0,
            time: `${today} ${s + 1}:20`,
          },
          {
            status: 'open',
            slotId: 13,
            headCount: 1,
            time: `${today} ${s + 1}:30`,
          },
          {
            status: 'close',
            slotId: 14,
            headCount: 2,
            time: `${today} ${s + 1}:40`,
          },
          {
            status: 'open',
            slotId: 15,
            headCount: 1,
            time: `${today} ${s + 1}:50`,
          },
        ],
        [
          {
            status: 'open',
            slotId: 20,
            headCount: 1,
            time: `${today} ${s + 2}:00`,
          },
          {
            status: 'close',
            slotId: 21,
            headCount: 1,
            time: `${today} ${s + 2}:10`,
          },
          {
            status: 'open',
            slotId: 22,
            headCount: 0,
            time: `${today} ${s + 2}:20`,
          },
          {
            status: 'open',
            slotId: 23,
            headCount: 1,
            time: `${today} ${s + 2}:30`,
          },
          {
            status: 'close',
            slotId: 24,
            headCount: 2,
            time: `${today} ${s + 2}:40`,
          },
          {
            status: 'open',
            slotId: 25,
            headCount: 1,
            time: `${today} ${s + 2}:50`,
          },
        ],
        [
          {
            status: 'open',
            slotId: 30,
            headCount: 1,
            time: `${today} ${s + 3}:00`,
          },
          {
            status: 'close',
            slotId: 31,
            headCount: 1,
            time: `${today} ${s + 3}:10`,
          },
          {
            status: 'open',
            slotId: 32,
            headCount: 0,
            time: `${today} ${s + 3}:20`,
          },
          {
            status: 'open',
            slotId: 33,
            headCount: 1,
            time: `${today} ${s + 3}:30`,
          },
          {
            status: 'close',
            slotId: 34,
            headCount: 2,
            time: `${today} ${s + 3}:40`,
          },
          {
            status: 'open',
            slotId: 35,
            headCount: 1,
            time: `${today} ${s + 3}:50`,
          },
        ],
        [
          {
            status: 'open',
            slotId: 40,
            headCount: 1,
            time: `${today} ${s + 4}:00`,
          },
          {
            status: 'close',
            slotId: 41,
            headCount: 1,
            time: `${today} ${s + 4}:10`,
          },
          {
            status: 'open',
            slotId: 42,
            headCount: 0,
            time: `${today} ${s + 4}:20`,
          },
          {
            status: 'open',
            slotId: 43,
            headCount: 1,
            time: `${today} ${s + 4}:30`,
          },
          {
            status: 'close',
            slotId: 44,
            headCount: 2,
            time: `${today} ${s + 4}:40`,
          },
          {
            status: 'open',
            slotId: 45,
            headCount: 1,
            time: `${today} ${s + 4}:50`,
          },
        ],
      ],
    };
    res.status(200).json(obj);
  } else if (req.method === 'POST') {
    res.status(200).json({ message: '등록이 완료되었습니다.' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: '정상적으로 취소되었습니다.' });
  } else res.status(500).json({ message: '잘못된 요청입니다.' });
}
