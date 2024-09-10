// pages/api/tournaments/[tournamentId]/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { DummyData } from './dummyData';
function isString(value: any): value is string {
  return typeof value === 'string';
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { tournamentId },
    method,
    query,
  } = req;

  const userId = query.users;

  if (isString(tournamentId) && isString(userId)) {
    const idAsNumber = parseInt(tournamentId, 10);
    const userAsNumber = parseInt(userId, 10);
    if (method === 'GET') {
      // GET /api/tournaments/{tournamentId}/users 요청에 대한 처리
      for (let i = 0; i < DummyData.length; i++) {
        if (DummyData[i].tournamentId === idAsNumber) {
          for (let j = 0; j < DummyData[i].users.length; ++j) {
            if (DummyData[i].users[j] == userAsNumber) {
              res.status(200).json({
                status: false,
              });
              return;
            }
          }
        }
      }
      res.status(200).json({
        status: false,
      });
      return;
    } else if (method === 'POST') {
      for (let i = 0; i < DummyData.length; i++) {
        if (DummyData[i].tournamentId === idAsNumber) {
          for (let j = 0; j < DummyData[i].users.length; ++j) {
            if (DummyData[i].users[j] === userAsNumber) {
              DummyData[i].users.splice(j, 1);
              res.status(200).json({
                status: false,
              });
              return;
            }
          }
        }
        DummyData[i].users.push(userAsNumber);
        res.status(200).json({
          status: true,
        });
        return;
      }
      res.status(404).json({
        error: 'Touranment Id not Found',
      });
      return;
    } else {
      // 다른 요청 메소드에 대한 처리
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
  }
}
