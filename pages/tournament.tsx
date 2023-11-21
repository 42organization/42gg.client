import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

//나중에 삭제 필요
interface TempData {
  tournaments: TournamentInfo[];
  totalPage: number;
}

// 내부의 토너먼트 보여주는 부분만 Component화 하면될까? 다른곳에서도 쓰일까?
// 진행중인 토너먼트의 Bracket을 보여주는 부분도 다른곳에서도 쓸수있지않나?
const tempData: TempData = {
  tournaments: [
    {
      tournamentId: 5,
      title: '5회 루키 토너먼트',
      contents: '블라블라',
      startTime: new Date(),
      status: '종료',
      type: 'ROOKIE',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '7회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '8회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '9회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '10회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '11회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
    {
      tournamentId: 6,
      title: '12회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startTime: new Date(),
      status: '진행중',
      type: 'MASTER',
      endTime: new Date(),
      winnerIntraId: 'jincpark',
      winnerImageUrl: '',
      player_cnt: 8,
    },
  ],
  totalPage: 100,
};

export default function Tournament() {
  const setError = useSetRecoilState(errorState);

  // const openTorunamentInfo = useQuery<TournamentInfo>(
  //   'openTorunamentInfo',
  //   () =>
  //     instance
  //       .get('pingpong/tournaments?page=*&type=*&status=진행중')
  //       .then((res) => res.data),
  //   { retry: 1, staleTime: 60000 /* 60초 */ }
  // );

  // const waitTournamentInfo = useQuery<TournamentInfo>(
  //   'waitTournamentInfo',
  //   () =>
  //     instance
  //       .get('pingpong/tournaments?page=*&type=*&status=예정')
  //       .then((res) => res.data),
  //   { retry: 1, staleTime: 60000 /* 60초 */ }
  // );

  // if (openTorunamentInfo.isError || waitTournamentInfo.isError) {
  //   setError('junhjeon');
  // }

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentTextWait}> 대기중인 토너먼트 </div>
        <div className={styles.waitTournamentBox}>
          {tempData.tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
        <div className={styles.tournamentTextOpen}> 진행중인 토너먼트 </div>
        <div className={styles.openTournamentBox}>
          <div className={styles.tournamentText}> 무언가 토너먼트의 사진 </div>
        </div>
      </div>
    </div>
  );
}
