import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminFeedbackCheck.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
// import { finished } from 'stream';
import { useRouter } from 'next/router';
import GameResultSmallItem from 'components/game/small/GameResultSmallItem';

interface Result {
  status: string;
}

export default function AdminFeedbackCheck(props: any) {
  const [result, setResult] = useState<Result>({
    status: '',
  });
  const setModal = useSetRecoilState(modalState);

  const sendReminder: { [key: string]: string } = {
    YES: '성공적으로 전송되었습니다',
    NO: '전송이 취소되었습니다',
  };

  const finishSendHandler = async () => {
    if (result.status == 'completed') {
      try {
        await instance.post(`/pingpong/feedback/${props.id}/reminder`);
        setModal({ modalName: null });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const cancelReminderHandler = () => {
    if (result.status == 'completed') {
      setModal({ modalName: null });
    }
  };
  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>FEEDBACK REMINDER</div>
        <div className={styles.text}>
          Are you sure you want to send the reminder?
        </div>
        <div className={styles.btns}>
          <button
            className={sendReminder ? `${styles.hide}` : `${styles.btn}`}
            onClick={finishSendHandler}
          >
            <div className={styles.btntext}>YES</div>
          </button>
          <button className={styles.btn} onClick={cancelReminderHandler}>
            <div className={styles.btntext}>NO</div>
          </button>
        </div>
      </div>
    </div>
  );
}
