import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | object>
) {
  if (req.method === 'GET') {
    if (req.query.userId && req.query.chartType === 'rank') {
      const historics1 = [
        {
          date: '2022-01-01 12:00',
          ppp: 30,
        },
        {
          date: '2022-01-01 13:00',
          ppp: 40,
        },
        {
          date: '2022-01-01 14:00',
          ppp: 50,
        },
        {
          date: '2022-01-01 15:00',
          ppp: 40,
        },
        {
          date: '2022-01-01 16:00',
          ppp: 30,
        },
        {
          date: '2022-01-01 17:30',
          ppp: 20,
        },
        {
          date: '2022-01-02 12:00',
          ppp: 30,
        },
        {
          date: '2022-01-02 12:30',
          ppp: 40,
        },
        {
          date: '2022-01-02 12:50',
          ppp: 50,
        },
        {
          date: '2022-01-02 13:10',
          ppp: 60,
        },
      ];
      const historics2 = [
        {
          date: '2022-01-02 15:00',
          ppp: 70,
        },
        {
          date: '2022-01-02 15:30',
          ppp: 80,
        },
        {
          date: '2022-01-02 18:20',
          ppp: 90,
        },
        {
          date: '2022-01-02 18:50',
          ppp: 100,
        },
        {
          date: '2022-01-03 12:10',
          ppp: 90,
        },
        {
          date: '2022-01-03 15:10',
          ppp: 80,
        },
        {
          date: '2022-01-03 17:10',
          ppp: 70,
        },
        {
          date: '2022-01-03 17:50',
          ppp: 60,
        },
        {
          date: '2022-01-03 18:00',
          ppp: 50,
        },
        {
          date: '2022-01-04 12:00',
          ppp: 40,
        },
      ];
      const historics3 = [
        {
          date: '2022-01-04 12:30',
          ppp: 30,
        },
        {
          date: '2022-01-04 13:00',
          ppp: 40,
        },
        {
          date: '2022-01-04 13:20',
          ppp: 50,
        },
        {
          date: '2022-01-04 14:00',
          ppp: 60,
        },
        {
          date: '2022-01-04 15:30',
          ppp: 70,
        },
        {
          date: '2022-01-04 17:00',
          ppp: 80,
        },
        {
          date: '2022-01-04 17:20',
          ppp: 90,
        },
        {
          date: '2022-01-05 13:00',
          ppp: 100,
        },
        {
          date: '2022-01-05 13:40',
          ppp: 110,
        },
        {
          date: '2022-01-05 14:50',
          ppp: 120,
        },
      ];
      return res
        .status(200)
        .json({ historics: [...historics1, ...historics2, ...historics3] });
    }
  }
  res.status(400).json({ message: '잘못된 형식 입니다.' });
}
