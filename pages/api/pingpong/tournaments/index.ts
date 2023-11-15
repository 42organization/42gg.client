import { NextApiRequest, NextApiResponse } from 'next';

const dummyUser = {
  id: 2147,
  intraId: 'jincpark',
  imageUrl:
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
  statusMessage: 'I am fine, thank you. And you?',
  roleType: 'USER',
};

const dummyFinishedRookieTournament = {
  tournamentId: 5,
  title: '5회 루키 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '종료',
  type: 'rookie',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyFinishedMasterTournament = {
  tournamentId: 6,
  title: '5회 마스터 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '종료',
  type: 'master',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyRunningRookieTournament = {
  tournamentId: 7,
  title: '6회 루키 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '진행중',
  type: 'rookie',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyRunningMasterTournament = {
  tournamentId: 8,
  title: '6회 마스터 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '진행중',
  type: 'master',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyExpectedRookieTournament = {
  tournamentId: 9,
  title: '7회 루키 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '예정',
  type: 'rookie',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyExpectedMasterTournament = {
  tournamentId: 10,
  title: '7회 마스터 토너먼트',
  contents: '블라블라',
  startTime: '2023-11-11',
  endTime: '2023-11-11',
  status: '예정',
  type: 'master',
  winner: `${dummyUser}`,
  player_cnt: 8,
};

const dummyTournaments = [
  dummyFinishedRookieTournament,
  dummyFinishedMasterTournament,
  dummyRunningRookieTournament,
  dummyRunningMasterTournament,
  dummyExpectedRookieTournament,
  dummyExpectedMasterTournament,
  dummyFinishedRookieTournament,
  dummyFinishedMasterTournament,
  dummyRunningRookieTournament,
  dummyRunningMasterTournament,
  dummyExpectedRookieTournament,
  dummyExpectedMasterTournament,
  dummyFinishedRookieTournament,
  dummyFinishedMasterTournament,
  dummyRunningRookieTournament,
  dummyRunningMasterTournament,
  dummyExpectedRookieTournament,
  dummyExpectedMasterTournament,
  dummyFinishedRookieTournament,
  dummyFinishedMasterTournament,
  dummyRunningRookieTournament,
  dummyRunningMasterTournament,
  dummyExpectedRookieTournament,
  dummyExpectedMasterTournament,
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, type, status, size } = req.query as {
    page: string;
    type: string;
    status: string;
    size: string;
  };

  if (!page) {
    res.status(404).end('You must put page!!');
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

  let SIZE = 20;
  if (size) {
    SIZE = parseInt(size);
  }

  // 소수점이 있을 경우 올림
  const totalPage = Math.ceil(filteredTournaments.length / SIZE);

  // page와 size에 맞게 slice
  filteredTournaments = filteredTournaments.slice(
    (parseInt(page) - 1) * SIZE,
    SIZE * parseInt(page)
  );

  res.status(200).json({
    tournaments: filteredTournaments,
    totalPage: totalPage,
  });
}
