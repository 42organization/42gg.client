import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { feedbackId } = body as { feedbackId: number };

  switch (method) {
    case 'PUT':
      if (feedbackId === undefined) {
        res.status(400).end('Bad Request');
        return;
      }
      res.status(200).json({
        isSolved: true,
      });
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
