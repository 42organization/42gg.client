import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/admin/modal/AdminNotiAll.module.scss';
import { toastState } from 'utils/recoil/toast';

interface EditedAllNoti {
  notification: string | number;
}

export default function AdminNotiAllModal() {
  const [allNoti, setAllNoti] = useState<any>(/* 초기값 필요 */);
  const [editedAllNoti, setEditedAllNoti] = useState<EditedAllNoti>({
    notification: '',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setEditedAllNoti((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setModal = useSetRecoilState(modalState);
  const finishEditHandler = () => setModal({ modalName: null });
  const cancelEditHandler = () => setModal({ modalName: null });
  const setSnackBar = useSetRecoilState(toastState);

  const handleClick = () => {
    setSnackBar({
      toastName: 'noti all',
      severity: 'success',
      message: 'Successfully Sent!',
      clicked: true,
    });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>NOTI FOR ALL</div>

        <label className={styles.body}>
          <textarea
            className={styles.blank}
            name='notification'
            onChange={inputChangeHandler}
            value={allNoti?.notification}
            placeholder={'모두에게 전달할 알림을 입력해주세요'}
          />
        </label>

        <div className={styles.btns}>
          <button
            onClick={() => {
              handleClick();
            }}
            className={styles.btn}
          >
            적용
          </button>
          <button className={styles.btn} onClick={cancelEditHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
