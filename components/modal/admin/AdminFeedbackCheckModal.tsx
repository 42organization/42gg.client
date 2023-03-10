import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { IFeedback } from 'components/admin/feedback/FeedbackTable';
import instance from 'utils/axios';
import { IoSend } from 'react-icons/io5';
import styles from 'styles/admin/modal/AdminFeedbackCheck.module.scss';

export default function AdminFeedbackCheck({
  id,
  intraId,
  isSolved,
}: IFeedback) {
  const setModal = useSetRecoilState(modalState);

  const sendNotificationHandler = async (isSend: boolean) => {
    try {
      await instance.put(`pingpong/admin/feedback/is-solved`, {
        feedbackId: id,
      });
      await instance.post(`pingpong/admin/notifications/${intraId}`, {
        intraId,
        message: isSolved
          ? '피드백을 검토중입니다.'
          : '피드백이 반영되었습니다.',
        sendMail: isSend,
      });
      setModal({ modalName: null });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div>
          <IoSend size={42} color={'#1556B8'} />
        </div>
        <div className={styles.content}>유저에게 알림을 보내겠습니까?</div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.first}`}
            onClick={() => sendNotificationHandler(true)}
          >
            예
          </button>
          <button
            className={`${styles.btn} ${styles.second}`}
            onClick={() => sendNotificationHandler(false)}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
