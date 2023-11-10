import { TournamentInfo } from 'types/tournamentTypes';
import styles from 'styles/tournament/TournamentCard.module.scss';

export default function TournamentCard({
  tournamentId,
  title,
  contents,
  status,
  type,
  winnerUser,
  startTime,
  endTime,
}: TournamentInfo) {
  return (
    <div className={styles.tournamentCardContainer}>
      <div className={styles.text}>{title}</div>
    </div>
  );
}
