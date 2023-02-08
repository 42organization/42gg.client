import { NextApiRequest, NextApiResponse } from 'next';
import { makeNotifications } from '.';

interface IPartialNotification {
  intraId: string;
  slotId: number; // TODO ? optional property로 해야하지 않을까 싶다.
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { intraId, page } = query as { intraId: string; page: string };

  const notification: IPartialNotification = {
    intraId: intraId as string,
    slotId: 1,
    message: 'Hello, World!',
    sendMail: true,
  };

  if (method === 'POST') {
    res.status(200).json(notification);
  } else if (method === 'GET') {
    if (intraId && page) {
      const notifications: IPagedNotification = makeNotifications(
        page,
        intraId
      );
      return res.status(200).json(notifications);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
