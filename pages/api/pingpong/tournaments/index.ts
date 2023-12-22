import { NextApiRequest, NextApiResponse } from 'next';
import dummyTournaments from './dummyTournamentData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, type, status, size } = req.query as {
    page: string;
    type: string;
    status: string;
    size: string;
  };

  if (!page) {
    res.status(404).end('You must put page!!');
    return;
  }

  let filteredTournaments = dummyTournaments;
  if (type || status) {
    filteredTournaments = dummyTournaments.filter((tournament) => {
      return (
        (!type || tournament.type === type) &&
        (!status || tournament.status === status)
      );
    });
  }

  let sizeInt = 20;
  if (size) {
    sizeInt = parseInt(size);
  }

  // 소수점이 있을 경우 올림

  if (filteredTournaments.length == 0) {
    res.status(200).json({
      tournaments: [],
      totalPage: 0,
    });
    return;
  }

  const totalPage = Math.ceil(filteredTournaments.length / sizeInt);

  if (parseInt(page) > totalPage) {
    res.status(404).end('Page number exceeded');
    return;
  }

  // page와 size에 맞게 slice
  const startIndex = (parseInt(page) - 1) * sizeInt;
  filteredTournaments = filteredTournaments.slice(
    startIndex,
    startIndex + sizeInt
  );

  res.status(200).json({
    tournaments: filteredTournaments,
    totalPage: totalPage,
  });
  return;
}
