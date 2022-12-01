import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Cancel } from 'types/modalTypes';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import {
  currentMatchState,
  openCurrentMatchState,
  reloadMatchState,
} from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/CancelModal.module.scss';

export default function CancelModal({ slotId }: Cancel) {
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [currentMatch, setCurrentMatch] = useRecoilState(currentMatchState);
  const content = {
    emoji: '🤔',
    main: '해당 경기를\n취소하시겠습니까?',
  };
  const cancelResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 취소되었습니다.',
    SD001: '이미 지난 경기입니다.',
    SD002: '이미 매칭이 완료된 경기입니다.',
    E0001: '잘못된 요청입니다.',
  };

  useEffect(() => {
    getCurrentMatchHandler();
  }, []);

  const onCancel = async () => {
    try {
      await instance.delete(`/pingpong/match/slots/${slotId}`);
      alert(cancelResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in cancelResponse)
        alert(cancelResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        setOpenCurrentMatch(false);
        setError('JH01');
        return;
      }
    }
    setModal({ modalName: null });
    setOpenCurrentMatch(false);
    setReloadMatch(true);
  };

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get('/pingpong/match/current');
      setCurrentMatch(res.data);
    } catch (e) {
      setError('JH08');
    }
  };

  const onReturn = () => {
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>{content.emoji}</div>
        {content.main}
        {<div className={styles.subContent}></div>}
      </div>
      <div className={styles.buttons}>
        {
          <>
            <div className={styles.negative}>
              <input onClick={onReturn} type='button' value='아니오' />
            </div>
            <div className={styles.positive}>
              <input onClick={onCancel} type='button' value='예' />
            </div>
          </>
        }
      </div>
    </div>
  );
}
