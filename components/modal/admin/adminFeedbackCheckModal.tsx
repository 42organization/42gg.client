import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminFeedbackCheck.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
// import { finished } from 'stream';
import { useRouter } from 'next/router';

interface EditedPenalty {
  reason: string;
  penaltyHour: number;
  penaltyMinute: number;
  // presentPath: boolean;
}

const MINUTE_LIMIT = 59;

export default function AdminFeedbackCheck(props: any) {
  const [userPenalty, setUserPenalty] = useState<any>(/* 초기값 지정 */);
  const [editedPenalty, setEditedPenalty] = useState<EditedPenalty>({
    reason: '',
    penaltyHour: parseInt('', 10),
    penaltyMinute: parseInt('', 10),
    // presentPath: true,
  });

  const setModal = useSetRecoilState(modalState);
  const cancelEditHandler = () => setModal({ modalName: null });

  // useEffect(() => {
  //   if (editedPenalty.presentPath === true) {
  //     if (!userPenalty) inputChangeHandler;
  //   } else finishEditHandler;
  // }, [presentPath]);

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setEditedPenalty((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const finishEditHandler = () => {
    setUserPenalty({
      ...editedPenalty,
      intraID: props.value,
    });
    // setModal({ modalName: null });
  };
  useEffect(() => {
    console.log({ userPenalty });
    return () => {
      console.log({ userPenalty });
    };
  }, [userPenalty]);

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>FEEDBACK REMINDER</div>
        <div className={styles.text}>
          Are you sure you want send the remind message?
        </div>
        <div className={styles.btns}>
          <button
            className={userPenalty ? `${styles.hide}` : `${styles.btn}`}
            onClick={finishEditHandler}
          >
            <div className={styles.btntext}>YES</div>
          </button>
          <button className={styles.btn} onClick={cancelEditHandler}>
            <div className={styles.btntext}>NO</div>
          </button>
        </div>
      </div>
    </div>
  );
}
