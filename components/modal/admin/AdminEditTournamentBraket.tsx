import { TournamentInfo } from 'types/modalTypes';
import styles from 'styles/admin/modal/AdminEditTournamentBraket.module.scss';

export default function AdminEditTournamentBraket(
  tournamentInfo: TournamentInfo
) {
  const {
    tournamentId,
    title,
    contents,
    startDate,
    endDate,
    status,
    type,
    winnerId,
    winnerImage,
  } = tournamentInfo;

  return (
    <>
      <div className={styles.whole}>
        <h2>{JSON.stringify(tournamentInfo)}</h2>
      </div>
    </>
  );
}
