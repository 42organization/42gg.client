import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/tournament/TournamentCard.module.scss';

export default function TournamentCard({
  tournamentId,
  title,
  contents,
  status,
  type,
  startTime,
  endTime,
  winnerIntraId,
  winnerImageUrl,
  player_cnt,
}: TournamentInfo) {
  const setModal = useSetRecoilState<Modal>(modalState);

  const openTournamentInfoModal = () => {
    setModal({
      modalName: 'TOURNAMENT-REGISTRY',
      tournamentInfo: {
        tournamentId: tournamentId,
        title: title,
        contents: contents,
        startTime: startTime,
        status: status,
        type: type,
        endTime: endTime,
        winnerIntraId: winnerIntraId,
        winnerImageUrl: winnerImageUrl,
        player_cnt: player_cnt,
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
