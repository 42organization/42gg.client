import { NextApiRequest, NextApiResponse } from 'next';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tournamentId } = req.query;
  if (req.method === 'GET') {
    const isJoined = req.query.isJoined;
    if (isJoined === undefined) {
      res.status(200).json({ users: tournamentUsers });
    } else {
      const isJoinedBool = isJoined === 'true';
      const filteredTournamentUsers = tournamentUsers.filter(
        (user) => user.isJoined === isJoinedBool
      );
      res.status(200).json({ users: filteredTournamentUsers });
    }
  } else if (req.method === 'POST') {
    const { intraId } = req.body;

    let joinedCount = 0;
    for (let i = 0; i < tournamentUsers.length; i++) {
      if (tournamentUsers[i].isJoined === true) {
        joinedCount++;
        if (intraId === tournamentUsers[i].intraId) {
          res.status(409).end('이미 리그에 참여중인 유저입니다.');
          return;
        }
      }
    }

    const newUser: ITournamentUser = {
      userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
      intraId: intraId,
      isJoined: joinedCount < 8 ? true : false,
    };

    tournamentUsers.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(405).end('허용되지 않는 메소드입니다.');
  }
}

const tournamentUsers: ITournamentUser[] = [
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'jincpark',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'junhjeon',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'jaehyuki',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'sechung',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'sgo',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'spark2',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'hannkim',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'jahlee',
    isJoined: true,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'jang-cho',
    isJoined: false,
  },
  {
    userId: Math.floor(Math.random() * (1000000 - 11 + 1)) + 11,
    intraId: 'chanheki',
    isJoined: false,
  },
];
