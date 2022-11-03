import { useRecoilValue, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { currentMatchState } from 'utils/recoil/match';
import { openCurrentMatchState } from 'utils/recoil/match';
import styles from 'styles/modal/CancelModal.module.scss';

interface SlotProps {
  slotId: number;
}

export default function CancelModal({ slotId }: SlotProps) {
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const currentMatch = useRecoilValue(currentMatchState);

  const onCancel = async () => {
    try {
      await instance.delete(`/pingpong/match/slots/${slotId}`);
      alert('경기가 성공적으로 취소되었습니다.');
    } catch (e: any) {
      if (e.response.data.code === 'SD001') alert('이미 지난 경기입니다.');
      else if (e.response.data.code === 'SD002')
        alert('이미 매칭이 완료된 경기입니다.');
      else {
        setModal({ modalName: null });
        setOpenCurrentMatch(false);
        setError('JH01');
        return;
      }
    }
    setModal({ modalName: null });
    setOpenCurrentMatch(false);
    window.location.reload();
  };

  const onReturn = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🤔</div>
        <div>
          해당 경기를
          <br />
          취소하시겠습니까?
        </div>
        {currentMatch.isMatched && (
          <div className={styles.subContent}>
            &#9888; 매칭이 완료된 경기를 취소하면
            <br />
            1분 간 새로운 예약이 불가합니다!
          </div>
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
