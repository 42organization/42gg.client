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
  const setError = useSetRecoilState(errorState);
  const [registState, setRegistState] = useState<string>('LOADING');
  const [openDate, setOpenDate] = useState<string>('미정');
  const [loading, setLoading] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(player_cnt);

  const registTournament = useCallback(() => {
    setLoading(true);
    return instance
      .post(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        alert('토너먼트 신청이 완료됐습니다');
        setLoading(false);
        setRegistState(res.data.status);
        if (playerCount < 8) setPlayerCount(playerCount + 1);
        return res.data.status;
      })
      .catch((error) => {
        alert('토너먼트 신청 중 에러가 발생했습니다.');
        setLoading(false);
      });
  }, [playerCount]);

  const unRegistTournament = useCallback(() => {
    setLoading(true);
    return instance
      .delete(`/pingpong/tournaments/${tournamentId}/users`)
      .then((res) => {
        if (registState === 'WAIT') {
          alert('토너먼트 대기가 취소 되었습니다');
        } else {
          setPlayerCount(playerCount - 1);
          alert('토너먼트 등록이 취소 되었습니다');
        }
        setRegistState(res.data.status);
        setLoading(false);
        return res.data.status;
      })
      .catch((error) => {
        alert('토너먼트 등록취소 중 에러가 발생했습니다');
        setLoading(false);
      });
  }, [playerCount]);

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

  useEffect(() => {
    getStatus();
    const date = new Date(startTime);
    setOpenDate(dateToKRLocaleTimeString(date));
  }, []);

  console.log(registState);
  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  const buttonContents: Record<string, string> = {
    LOADING: '로딩중...',
    BEFORE: '등록',
    WAIT: '대기 취소',
    PLAYER: '등록 취소',
  };

  const buttonAction: Record<string, any> = {
    BEFORE: registTournament,
    WAIT: unRegistTournament,
    PLAYER: unRegistTournament,
    LOADING: () => {
      console.log('loading..');
    },
  };

  const buttonContent = buttonContents[registState];
  const buttonHandler = buttonAction[registState];

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
            onClick={buttonHandler}
            value={
              player_cnt === 8 && registState === 'BEFORE'
                ? '대기 등록'
                : buttonContent
            }
            style={'positive'}
            isLoading={loading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
