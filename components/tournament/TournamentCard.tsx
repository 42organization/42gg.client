import { useSetRecoilState } from 'recoil';
import { SlCalender } from 'react-icons/sl';
import { Modal } from 'types/modalTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { dateToString } from 'utils/handleTime';
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

  const date = new Date(startTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const il = date.getDate();
  const start = `${year}.${month}.${il}`;

  return (
    <div
      className={styles.tournamentCardContainer}
      onClick={openTournamentInfoModal}
    >
      <div className={styles.text}>
        <div className={styles.left}>{title}</div>
        <div className={styles.right}>
          <SlCalender /> {start}
        </div>
      </div>
    </div>
  );
}
