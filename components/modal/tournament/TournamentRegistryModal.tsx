import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MdPeopleAlt } from 'react-icons/md';
import { QUILL_FORMATS } from 'types/quillTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { dateToKRLocaleTimeString } from 'utils/handleTime';
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
  const [registState, setRegistState] = useState<string>('LOADING');
  const [openDate, setOpenDate] = useState<string>('미정');
  const [closeDate, setCloseDate] = useState<string>('미정');
  const [loading, setLoading] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(player_cnt);
  const registTournament = useCallback(() => {
    setLoading(true);
    return instance
      .post(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        setLoading(false);
        setSnackbar({
          toastName: `토너먼트 신청`,
          severity: 'success',
          message: `🔥 토너먼트 참가 신청이 완료 됐습니다 ! 🔥`,
          clicked: true,
        });
        setRegistState(res.data.status);
        return res.data.status;
      })
      .catch((error) => {
        setSnackbar({
          toastName: `토너먼트 신청`,
          severity: 'error',
          message: `${
            error.response?.data?.message
              ? error.response.data.message
              : '예상치 못한 에러가 발생했습니다 다시 시도해 주세요 😢'
          } `,
          clicked: true,
        });
        setLoading(false);
      });
  }, []);

  const unRegistTournament = useCallback(() => {
    setLoading(true);
    return instance
      .delete(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        if (registState === 'WAIT') {
          setSnackbar({
            toastName: `토너먼트 대기 취소`,
            severity: 'success',
            message: `토너먼트 대기 신청을 취소했습니다.`,
            clicked: true,
          });
        } else {
          setSnackbar({
            toastName: `토너먼트 신청 취소 `,
            severity: 'success',
            message: `토너먼트 참가 신청을 취소했습니다.`,
            clicked: true,
          });
        }
        setRegistState(res.data.status);
        setLoading(false);
        return res.data.status;
      })
      .catch((error) => {
        setSnackbar({
          toastName: `토너먼트 신청 취소`,
          severity: 'error',
          message: `취소중 에러가 발생했습니다.`,
          clicked: true,
        });
        setLoading(false);
      });
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

  const getTournamentInfo = useCallback(() => {
    return instance
      .get(`/pingpong/tournaments/${tournamentId}`)
      .then((res) => {
        setPlayerCount(res.data.player_cnt);
        return res.data.player_cnt;
      })
      .catch((error) => {
        setError('JJH2');
      });
  }, [tournamentId]);

  useEffect(() => {
    getStatus();
    setOpenDate(dateToKRLocaleTimeString(new Date(startTime)));
    setCloseDate(dateToKRLocaleTimeString(new Date(endTime)));
  }, []);

  useEffect(() => {
    if (registState !== 'LOADING') getTournamentInfo();
  }, [registState, getTournamentInfo]);

  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  const buttonMappings: Record<string, any> = {
    LOADING: {
      content: '로딩중...',
      handler: () => {
        console.log('loading...');
      },
    },
    BEFORE: {
      content: '등록',
      handler: registTournament,
    },
    WAIT: {
      content: '대기 취소',
      handler: unRegistTournament,
    },
    PLAYER: {
      content: '등록 취소',
      handler: unRegistTournament,
    },
  };

  const { content: buttonContent, handler: buttonHandler } =
    buttonMappings[registState];

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
        <div className={styles.startTime}> 시작 : {openDate}</div>
        <div className={styles.startTime}> 종료 : {closeDate}</div>
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
          {status !== 'LIVE' ? (
            <ModalButton
              onClick={buttonHandler}
              value={
                playerCount === 8 && registState === 'BEFORE'
                  ? '대기 등록'
                  : buttonContent
              }
              style={'positive'}
              isLoading={loading}
            />
          ) : (
            <ModalButton
              onClick={undefined}
              value={'진행중...'}
              style={'positive'}
              isLoading={loading}
            />
          )}
        </ModalButtonContainer>
      </div>
    </div>
  );
}
