import { useState } from 'react';
import { TournamentInfo } from 'types/tournamentTypes';
import WinnerSwiper from 'components/tournament-record/WinnerSwiper';
import styles from 'styles/tournament-record/TournamentRecord.module.scss';

export default function TournamentRecord() {
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>();
  const endTime = tournamentInfo ? new Date(tournamentInfo.endTime) : null;

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>명예의 전당</h1>
      <div className={styles.leagueButtonWrapper}>
        <button>Rookie</button>
        <button>Master</button>
        <button>Custom</button>
      </div>
      <WinnerSwiper
        type='ROOKIE'
        size={5}
        setTournamentInfo={setTournamentInfo}
      />
      <div className={styles.winnerInfoContainer}>
        <p className={styles.userId}>{tournamentInfo?.winnerIntraId}</p>
        <p className={styles.gameInfo}>
          {tournamentInfo?.title}{' '}
          <span className={styles.highlighted}>우승자</span>
        </p>
        <p className={styles.date}>{endTime?.toLocaleDateString()}</p>
      </div>
      <div className={styles.bracketContainer}></div>
    </div>
  );
}
