import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MdPeopleAlt } from 'react-icons/md';
import { QUILL_FORMATS } from 'types/quillTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/TournamentRegistryModal.module.scss';
import 'react-quill/dist/quill.bubble.css';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TournamentRegistryModal({
  title,
  contents,
  startTime,
  status,
  type,
  endTime,
  player_cnt,
  tournamentId,
}: TournamentInfo) {
  const setModal = useSetRecoilState(modalState);
  const [registState, setRegistState] = useState<boolean | null>(true);
  const [openDate, setOpenDate] = useState<string>('미정');

  const registTournament = useCallback(() => {
    return mockInstance
      .post(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        setRegistState(res.data.status);
        console.log(res.data.status);
        return res.data.status;
      });
  }, []);

  const getStatus = useCallback(() => {
    return mockInstance
      .get(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        setRegistState(res.data.status);
        return res.data.status;
      });
  }, []);

  useEffect(() => {
    getStatus();

    const date = new Date(startTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    setOpenDate(`${year}년 ${month}월 ${day}일 ${hours}:${minutes}`);
  }, []);

  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButtonContainer}>
        <ModalButtonContainer>
          <ModalButton
            onClick={closeModalButtonHandler}
            value='X'
            style='close'
          />
        </ModalButtonContainer>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.tournamentInfo}>
        <div className={styles.startTime}>{openDate}</div>
        <div className={styles.participants}>
          <MdPeopleAlt />
          <div className={styles.player}>{player_cnt} / 8</div>
        </div>
      </div>
      <Quill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={contents}
        theme='bubble'
      />
      <div>
        <ModalButtonContainer>
          <ModalButton
            onClick={registTournament}
            value={registState === true ? '취소' : '등록'}
            style={
              player_cnt === 8 && registState === false
                ? 'negative'
                : 'positive'
            }
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
