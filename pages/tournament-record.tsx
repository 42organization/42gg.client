import WinnerSwiper from 'components/tournament-record/WinnerSwiper';
import styles from 'styles/tournament-record/TournamentRecord.module.scss';

export default function TournamentRecord() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>명예의 전당</h1>
      <div className={styles.leagueButtonWrapper}>
        <button>Rookie</button>
        <button>Master</button>
        <button>Custom</button>
      </div>
      <WinnerSwiper type='ROOKIE' size={5} />
      <div className={styles.winnerInfoContainer}>
        <p className={styles.userId}>cadet2147</p>
        <p className={styles.gameInfo}>
          제 5회 정기 토너먼트 루키리그{' '}
          <span className={styles.highlighted}>우승자</span>
        </p>
        <p className={styles.date}>2023.11.11</p>
      </div>
      <div className={styles.bracketContainer}></div>
    </div>
  );
}
