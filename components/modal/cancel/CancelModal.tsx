import { useSetRecoilState } from 'recoil';
import {
  cancelModalState,
  openCurrentMatchInfoState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/modal/CancelModal.module.scss';

type SlotProps = {
  slotId: number;
};

export default function CancelModal({ slotId }: SlotProps) {
  const setOpenModal = useSetRecoilState(cancelModalState);
  const setOpenCurrentInfo = useSetRecoilState(openCurrentMatchInfoState);
  const setErrorMessage = useSetRecoilState(errorState);

  const onCancel = async () => {
    try {
      const res = await instance.delete(`/pingpong/match/slots/${slotId}`);
      alert('게임이 성공적으로 취소되었습니다.');
    } catch (e: any) {
      setOpenModal(false);
      setOpenCurrentInfo(false);
      setErrorMessage('Cancel Error');
      return;
    }
    setOpenModal(false);
    setOpenCurrentInfo(false);
    window.location.reload();
  };

  const onReturn = () => {
    setOpenModal(false);
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
        <div className={styles.subContent}>
          &#9888; 지금 경기를 취소하시면
          <br />
          1분 간 새로운 예약이 불가합니다!
        </div>
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
