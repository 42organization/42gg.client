import { NextApiRequest, NextApiResponse } from 'next';

interface IAllNotification {
  message: string;
  sendMail: boolean;
}

interface INotification {
  notiId: number;
  intraId: string;
  slotId: number;
  type: string;
  createdTime: string;
  isChecked: boolean;
}

interface IPagedNotification {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

const TOTAL_PAGE = 21;

const makeNotifications = (page: string): IPagedNotification => {
  const notiList: INotification[] = [];
  for (let i = 0; i < 40; i++) {
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
    notiList,
    totalPage: TOTAL_PAGE,
    currentPage: parseInt(page),
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const page = query.page as string;
    const notifications: IPagedNotification = makeNotifications(page);
    res.status(200).json(notifications);
  } else if (method === 'POST') {
    const { message, sendMail }: IAllNotification = body;
    res.status(201).json({ message, sendMail });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
