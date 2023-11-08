import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

// 내부의 토너먼트 보여주는 부분만 Component화 하면될까? 다른곳에서도 쓰일까?
// 진행중인 토너먼트의 Bracket을 보여주는 부분도 다른곳에서도 쓸수있지않나?
const tempData = {
  tournaments: [
    {
      tournametId: 5,
      title: '5회 루키 토너먼트',
      contents: '블라블라',
      startDate: '2023-11-11',
      status: '종료',
      type: 'rookie',
      winnerId: 'hannkim',
      winnerImage: '',
      endDate: '2023-11-11',
    },
    {
      tournametId: 6,
      title: '6회 마스터 토너먼트',
      contents: '블라블라 하이하이',
      startDate: '2023-11-12',
      status: '진행중',
      type: 'master',
      winnerId: 'hannkim',
      winnerImage: '',
      endDate: '2023-11-12',
    },
  ],
  totalPage: 100,
};

export default function Tournament() {
  const setModal = useSetRecoilState<Modal>(modalState);

  const handleTournament = () => {
    setModal({
      modalName: 'TOURNAMENT-REGISTRY',
      tournamentInfo: {
        tournamentName: '제1회 루키토너먼트',
        tournamentDiscription: '첫번재 루키 토너먼트 대회입니다 ! ',
        tournamentDate: '2023:12:12:24:00',
      },
    });
  };
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentTextWait}> 대기중인 토너먼트 </div>
        <div className={styles.waitTournamentBox}>
          {tempData.tournaments.map((tournament, index) => (
            <TournamentCard key={index} tournamentName={tournament.title} />
          ))}
          <TournamentCard tournamentName='무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트' />
          <TournamentCard tournamentName='무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트' />
          <TournamentCard tournamentName='무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트 무엇인가 겁나 긴 이름의 토너먼트' />
        </div>
        <div className={styles.tournamentTextOpen}> 진행중인 토너먼트 </div>
        <div className={styles.openTournamentBox}>
          <div className={styles.tournamentText}> 무언가 토너먼트의 사진 </div>
        </div>
      </div>
    </div>
  );
}
