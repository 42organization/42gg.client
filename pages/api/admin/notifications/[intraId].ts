import { NextApiRequest, NextApiResponse } from 'next';

interface IPartialNotification {
  intraId: string;
  slotId: number; // TODO ? optional property로 해야하지 않을까 싶다.
  message: string;
  sendMail: boolean;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { intraId } = query;

  const notification: IPartialNotification = {
    intraId: intraId as string,
    slotId: 1,
    message: 'Hello, World!',
    sendMail: true,
  };

  if (method === 'POST') {
    res.status(200).json({ ...body });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
