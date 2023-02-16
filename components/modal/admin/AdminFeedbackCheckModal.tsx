import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { IoSend } from 'react-icons/io5';
import styles from 'styles/admin/modal/AdminFeedbackCheck.module.scss';

export default function AdminFeedbackCheck() {
  const setModal = useSetRecoilState(modalState);

  const finishSendHandler = async () => {
    // try {
    //   await instance.put(`/admin/feedback/is-solved`, {
    //     feedbackId: 1,
    // });
    //   setModal({ modalName: null });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const cancelReminderHandler = () => setModal({ modalName: null });

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div>
          <IoSend size={42} color={'#1556B8'} />
        </div>
        <div className={styles.content}>알림을 보내겠습니까?</div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.first}`}
            onClick={finishSendHandler}
          >
            확인
          </button>
          <button
            className={`${styles.btn} ${styles.second}`}
            onClick={cancelReminderHandler}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
