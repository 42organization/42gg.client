import { useSetRecoilState } from 'recoil';
import { IoSend } from 'react-icons/io5';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminFeedbackCheck.module.scss';

interface IfeedbackProps {
  id: number;
  intraId: string;
  isSolved: boolean;
}

export default function AdminFeedbackCheck({
  id,
  intraId,
  isSolved,
}: IfeedbackProps) {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const sendNotificationHandler = async (isSend: boolean) => {
    try {
      await instanceInManage.patch(`/feedback/${id}`, {
        isSolved: isSolved,
      });
      await instanceInManage.post(`/notifications`, {
        intraId,
        message: isSolved
          ? '피드백을 검토중입니다.'
          : '피드백이 반영되었습니다.',
        // sendMail: isSend, todo: 슬랙으로 보내는 것으로 변경
      });
      setSnackBar({
        toastName: 'noti user',
        severity: 'success',
        message: `알림이 성공적으로 전송되었습니다!`,
        clicked: true,
      });
      setModal({ modalName: null });
    } catch (e) {
      console.error('SW03');
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
