import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { BiCalendar } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { Modal } from 'types/modalTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { dateToKRLocaleTimeString , dateToString } from 'utils/handleTime';
import { errorState } from 'utils/recoil/error';
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
  const [registState, setRegistState] = useState<string>('로딩중');
  const setError = useSetRecoilState(errorState);

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

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = useCallback(() => {
    return instance
      .get(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        setRegistState(res.data.status);
        return res.data.status;
      })
      .catch((error) => {
        setError('JJH2');
      });
  }, []);

  const start = dateToKRLocaleTimeString(new Date(startTime));
  const end = dateToKRLocaleTimeString(new Date(endTime));
  const isFull = player_cnt === 8 ? 'full' : 'notFull';

  return (
    <div
      className={styles.tournamentCardContainer}
      onClick={openTournamentInfoModal}
    >
      <div className={styles.text}>
        <div className={styles.up}>
          <div className={styles.title}>{title}</div>
          <div className={styles.tag}>
            <div className={`${styles.participants} ${styles[isFull]}`}>
              <MdPeopleAlt /> {player_cnt} / 8
            </div>
            <div className={`${styles.state} ${styles[registState]}`}>
              {registState}
            </div>
          </div>
        </div>
        <div className={styles.time}>
          <time>
            <BiCalendar /> {start}
          </time>
          ~
          <time>
            <BiCalendar /> {end}
          </time>
        </div>
      </div>
    </div>
  );
}
