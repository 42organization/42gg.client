import { totalmem } from 'os';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo , Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
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
  const setModal = useSetRecoilState<Modal>(modalState);

  const openTournamentInfoModal = () => {
    setModal({
      modalName: 'TOURNAMENT-REGISTRY',
      tournamentInfo: {
        tournametId: tournametId,
        title: title,
        contents: contents,
        startDate: startDate,
        status: status,
        type: type,
        winnerId: winnerId,
        winnerImage: winnerImage,
        endDate: endDate,
      },
    });
  };

  return (
    <div
      className={styles.tournamentCardContainer}
      onClick={openTournamentInfoModal}
    >
      <div className={styles.text}>{title}</div>
    </div>
  );
}
