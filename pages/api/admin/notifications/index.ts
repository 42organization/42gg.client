import { NextApiRequest, NextApiResponse } from 'next';

const PER_PAGE = 15;
const TOTAL_NOTI = 40;

const makeNotifications = (page: string) => {
  const notiList = [];
  for (let i = 0; i < TOTAL_NOTI; i++) {
    notiList.push({
      notiId: i,
      intraId: `mosong${i}`,
      slotId: 1,
      type: 'matched',
      createdTime: '2021-10-10 10:10:10',
      isChecked: i % 3 ? true : false,
    });
  }
  return {
    notiList: notiList.slice(
      (parseInt(page) - 1) * PER_PAGE,
      parseInt(page) * PER_PAGE
    ),
    totalPage: TOTAL_NOTI / PER_PAGE,
    currentPage: parseInt(page),
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page } = req.query;
    const notifications = makeNotifications(page as string);
    res.status(200).json(notifications);
  } else if (req.method === 'POST') {
    res.status(201).json({ text: 'Hello' });
  }
}
