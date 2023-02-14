import { NextApiRequest, NextApiResponse } from 'next';

const NOTI_TYPE = [
  'cancelByMan',
  'cancelByTime',
  'imminent',
  'matched',
  'announce',
];

interface IAllNotification {
  message: string;
  sendMail: boolean;
}

interface INotification {
  notiId: number;
  intraId: string;
  slotId: number;
  type: string;
  message: string;
  createdTime: string;
  isChecked: boolean;
}

interface IPagedNotification {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

const PER_PAGE = 10;
const TOTAL_NOTI = 46;

export const makeNotifications = (
  page: string,
  intraId?: string
): IPagedNotification => {
  let totalPage = (TOTAL_NOTI / PER_PAGE) as number;
  let filteredNotiList: INotification[] = [];
  const notiList: INotification[] = [];

  for (let i = 0; i < TOTAL_NOTI; i++) {
    notiList.push({
      notiId: i,
      intraId: `${
        Math.floor(Math.random() * 10) % 2 ? 'mosong' : `mosong${i}`
      }`,
      slotId: 1,
      type: NOTI_TYPE[Math.floor(Math.random() * NOTI_TYPE.length)],
      message: `Hello, World! ${Math.floor(Math.random() * 10)}`,
      createdTime: '2021-10-10 10:10:10',
      isChecked: Math.floor(Math.random() * 10) % 3 ? true : false,
    });
  }

  if (intraId) {
    filteredNotiList = notiList.filter((noti) => noti.intraId === intraId);
    totalPage = (filteredNotiList.length / PER_PAGE) as number;
  }

  return {
    notiList: intraId
      ? filteredNotiList.slice(
          (parseInt(page) - 1) * PER_PAGE,
          parseInt(page) * PER_PAGE
        )
      : notiList.slice(
          (parseInt(page) - 1) * PER_PAGE,
          parseInt(page) * PER_PAGE
        ),
    totalPage,
    currentPage: parseInt(page),
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { page } = query as { page: string };

  if (method === 'GET') {
    const notifications: IPagedNotification = makeNotifications(page);
    return res.status(200).json(notifications);
  } else if (method === 'POST') {
    const { message, sendMail }: IAllNotification = body;
    res.status(201).json({ message, sendMail });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
