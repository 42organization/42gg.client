import { NextApiRequest, NextApiResponse } from 'next';
import { dummyLiveTournamentGames } from './dummyTournamentGame';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { tournamentId } = query as {
    tournamentId: string;
    page: string;
    type: string;
    status: string;
    size: string;
  };

  if (method !== 'GET') {
    res.status(404).end('You must put page!!');
    return;
  }

  res.status(200).json(dummyLiveTournamentGames);
  return;
}
