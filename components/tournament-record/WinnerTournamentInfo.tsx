import { TournamentInfo } from 'types/tournamentTypes';
import styles from 'styles/tournament-record/WinnerTournamentInfo.module.scss';

interface WinnerTournamentInfoProps {
  tournamentInfo: TournamentInfo | undefined;
}

export default function WinnerTournamentInfo({
  tournamentInfo,
}: WinnerTournamentInfoProps) {
  const endTime = tournamentInfo ? new Date(tournamentInfo.endTime) : null;
  return (
    <div className={styles.winnerInfoContainer}>
      <p className={styles.userId}>
        {tournamentInfo?.winnerIntraId ?? '아이디 정보가 없습니다.'}
      </p>
      <p className={styles.gameInfo}>
        {tournamentInfo?.title}{' '}
        <span className={styles.highlighted}>우승자</span>
      </p>
      <p className={styles.date}>{endTime?.toLocaleDateString()}</p>
    </div>
  );
}
