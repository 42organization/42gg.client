import { TournamentInfo } from 'types/takgu/tournamentTypes';

const jincpark = {
  intraId: 'jincpark',
  imageUrl:
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
};

const jaehyuki = {
  intraId: 'jaehyuki',
  imageUrl:
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jaehyuki-7f6689c3-bf24-4e87-a04b-de9d61f1bef8.jpeg',
};

const junhjeon = {
  intraId: 'junhjeon',
  imageUrl:
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/junhjeon.jpeg',
};

const users = [jincpark, jaehyuki, junhjeon];

export const dummyTournaments: TournamentInfo[] = [];

for (let i = 28; i >= 1; i--) {
  let status;
  if (i === 28) {
    status = 'BEFORE';
  } else if (i === 27) {
    status = 'READY';
  } else if (i === 26) {
    status = 'LIVE';
  } else {
    status = 'END';
  }

  const rookieTournament: TournamentInfo = {
    tournamentId: i * 2,
    title: `${i}회 루키 토너먼트`,
    contents: '블라블라',
    startTime: new Date().toString(),
    endTime: new Date().toString(),
    status: status,
    type: 'ROOKIE',
    winnerIntraId: users[i % 3].intraId,
    winnerImageUrl: users[i % 3].imageUrl,
    playerCnt: 8,
  };

  const masterTournament: TournamentInfo = {
    tournamentId: i * 2 - 1,
    title: `${i}회 마스터 토너먼트`,
    contents: '블라블라',
    startTime: new Date().toString(),
    endTime: new Date().toString(),
    status: status,
    type: 'MASTER',
    winnerIntraId: users[i % 3].intraId,
    winnerImageUrl: users[i % 3].imageUrl,
    playerCnt: 7,
  };

  dummyTournaments.push(masterTournament, rookieTournament);
}

const dummy = () => {
  return null;
};
export default dummy;
