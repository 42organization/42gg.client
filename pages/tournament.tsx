import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/tournament/TournamentContainer.module.scss';

// 내부의 토너먼트 보여주는 부분만 Component화 하면될까? 다른곳에서도 쓰일까?
// 진행중인 토너먼트의 Bracket을 보여주는 부분도 다른곳에서도 쓸수있지않나?

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
        <h4 className={styles.tournamentText}> 열려있는 토너먼트 </h4>
        <div className={styles.waitTournamentBox}>
          <div onClick={handleTournament}> 제1회 루키 토너먼트 </div>
          <div onClick={handleTournament}> 제2회 루키 토너먼트 </div>
        </div>
        <h4 className={styles.tournamentText}> 진행중인 토너먼트 </h4>
        <div className={styles.openTournamentBox}>
          <div className={styles.tournamentText}> 무언가 토너먼트의 사진 </div>
        </div>
      </div>
    </div>
  );
}
