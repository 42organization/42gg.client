import { useRecoilValue, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import {
  openCurrentMatchState,
  currentMatchState,
  reloadMatchState,
} from 'utils/recoil/match';
import styles from 'styles/modal/CancelModal.module.scss';

interface CancelModalProps {
  slotId: number;
}

export default function CancelModal({ slotId }: CancelModalProps) {
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const currentMatch = useRecoilValue(currentMatchState);
  const cancelResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 취소되었습니다.',
    SD001: '이미 지난 경기입니다.',
    SD002: '이미 매칭이 완료된 경기입니다.',
  };
  const message = {
    main: ['해당 경기를', <br />, '취소하시겠습니까?'],
    sub: [
      '매칭이 완료된 경기를 취소하면',
      <br />,
      '1분 간 새로운 예약이 불가합니다!',
    ],
  };

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

  const onReturn = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🤔</div>
        <div>{message.main}</div>
        {currentMatch.isMatched && (
          <div className={styles.subContent}>&#9888;{message.sub}</div>
        )}
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onReturn} type='button' value='아니오' />
        </div>
        <div className={styles.positive}>
          <input onClick={onCancel} type='button' value='예' />
        </div>
      </div>
    </div>
  );
}
