import { TournamentInfo } from 'types/modalTypes';
import styles from 'styles/tournament/TournamentCard.module.scss';

export default function TournamentCard({
  tournametId,
  title,
  contents,
  startDate,
  status,
  type,
  winnerId,
  winnerImage,
  endDate,
}: TournamentInfo) {
  return (
    <div className={styles.tournamentCardContainer}>
      <div className={styles.text}>{title}</div>
    </div>
  );
}
