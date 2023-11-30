import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MdPeopleAlt } from 'react-icons/md';
import { QUILL_FORMATS } from 'types/quillTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
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
  const setSnackbar = useSetRecoilState(toastState);
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const [registState, setRegistState] = useState<boolean | null>(true);
  const [openDate, setOpenDate] = useState<string>('미정');
  const [loading, setLoading] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(player_cnt);

  const registTournament = useCallback(() => {
    setLoading(true);
    return mockInstance
      .post(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status) {
          setSnackbar({
            toastName: `토너먼트 등록 신청`,
            severity: 'success',
            message: `토너먼트 신청이 완료됐습니다`,
            clicked: true,
          });
          if (player_cnt < 8) setPlayerCount(playerCount + 1);
        }
        if (res.data.status == false) {
          setSnackbar({
            toastName: `토너먼트 등록취소 신청`,
            severity: 'success',
            message: `토너먼트 신청이 취소됐습니다`,
            clicked: true,
          });
        }

        setRegistState(res.data.status);
        setLoading(false);
        return res.data.status;
      })
      .catch((error) => {
        setSnackbar({
          toastName: `토너먼트 등록 신청`,
          severity: 'error',
          message: `토너먼트 신청 중 에러가 발생했습니다`,
          clicked: true,
        });
        setLoading(false);
      });
  }, []);

  const getStatus = useCallback(() => {
    return mockInstance
      .get(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        setRegistState(res.data.status);
        return res.data.status;
      })
      .catch((error) => {
        setError('JJH2');
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
          <div className={styles.player}>{playerCount} / 8</div>
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
            value={
              registState === true
                ? '등록 취소'
                : player_cnt === 8
                ? '대기 등록'
                : '등록'
            }
            style={'positive'}
            isLoading={loading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
