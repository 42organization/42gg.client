import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BiCalendar } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { Modal } from 'types/modalTypes';
import { TournamentInfo } from 'types/takgu/tournamentTypes';
import { instance } from 'utils/axios';
import { dateToKRLocaleTimeString } from 'utils/handleTime';
import { errorState } from 'utils/takgu/recoil/error';
import { modalState } from 'utils/takgu/recoil/modal';
import styles from 'styles/takgu/tournament/TournamentCard.module.scss';

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
  playerCnt,
  page,
}: TournamentInfo & { page: string }) {
  const modal = useRecoilValue(modalState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const [registState, setRegistState] = useState<string>('로딩중');
  const [playerCount, setPlayerCount] = useState<number>(playerCnt);
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
        playerCnt: playerCount,
      },
    });
  };

  const getTournamentInfo = useCallback(async () => {
    return instance
      .get(`/pingpong/tournaments/${tournamentId}`)
      .then((res) => {
        setPlayerCount(res.data.playerCnt);
        return res.data.playerCnt;
      })
      .catch((error) => {
        setError('JJH2');
      });
  }, [tournamentId, setError]);

  const getStatus = useCallback(async () => {
    return instance
      .get(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        setRegistState(res.data.status);
        return res.data.status;
      })
      .catch((error) => {
        setError('JJH2');
      });
  }, [tournamentId, setError]);

  const start = dateToKRLocaleTimeString(new Date(startTime));

  useEffect(() => {
    if (modal.modalName === null) {
      getTournamentInfo();
      getStatus();
    }
  }, [modal, getStatus, getTournamentInfo]);

  const end = dateToKRLocaleTimeString(new Date(endTime));
  const isFull = playerCount === 8 ? 'full' : 'notFull';

  const userState: Record<string, string> = {
    BEFORE: '참가하기!',
    PLAYER: '참가 중',
    WAIT: '대기 중',
  };

  return (
    <div
      className={`${styles.tournamentCard} ${styles[page]}`}
      onClick={page !== 'main' ? openTournamentInfoModal : undefined}
    >
      <div className={styles.text}>
        <div className={styles.up}>
          <div className={styles.title}>{title}</div>
          <div className={styles.tag}>
            {page === 'tournament' ? (
              <>
                <div className={`${styles.participants} ${styles[isFull]}`}>
                  <MdPeopleAlt /> {playerCount} / 8
                </div>
                <div className={`${styles.playerState} ${styles[registState]}`}>
                  {userState[registState]}
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.gameState} ${styles[status]}`}>
                  {status === 'LIVE' ? '경기 중' : '예정'}
                </div>
              </>
            )}
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
