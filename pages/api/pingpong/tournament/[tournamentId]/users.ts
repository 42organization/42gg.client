// pages/api/tournaments/[tournamentId]/users.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { tournamentId },
    method,
  } = req;

  if (method === 'POST') {
    // GET /api/tournaments/{tournamentId}/users 요청에 대한 처리
    res
      .status(200)
      .json({
        tournamentId,
        message: `This is the API route for tournament ${tournamentId} users`,
      });
  } else {
    // 다른 요청 메소드에 대한 처리
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
