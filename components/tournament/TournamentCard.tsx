import { TournamentInfo } from 'types/modalTypes';
import styles from 'styles/tournament/TournamentCard.module.scss';

export default function TournamentCard({ tournamentName }: TournamentInfo) {
  return (
    <div className={styles.tournamentCardContainer}>
      <div className={styles.text}>{tournamentName}</div>
    </div>
  );
}
