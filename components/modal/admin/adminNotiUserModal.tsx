import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminNotiAll.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import { finished } from 'stream';

interface EditedNotiUser {
  notification: string | number;
}

//noti가 비어있을 때 적용안되게 수정필요

export default function AdminNotiUserModal(props: any) {
  const [userNoti, setUserNoti] = useState<any>(/* 초기값 필요 */);
  const [editedNotiUser, setEditedNotiUser] = useState<EditedNotiUser>({
    notification: '',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setEditedNotiUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const finishEditHandler = () => {
    let errMsg = '';
    if (editedNotiUser.notification < 0) {
      errMsg += '시간은 0 이상이어야합니다.\n';
      console.log(errMsg);
      editedNotiUser.notification = '';
    }
    if (errMsg) alert(errMsg);
    setUserNoti({
      ...editedNotiUser,
      intraID: props.value,
    });
    // setModal({ modalName: null });
  };
  useEffect(() => {
    console.log({ userNoti });
    return () => {
      console.log({ userNoti });
    };
  }, [userNoti]);
  const setModal = useSetRecoilState(modalState);
  const cancelEditHandler = () => setModal({ modalName: null });

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>NOTI FOR [{props.value}] </div>

        <label className={styles.body}>
          To: {props.value}
          <input
            className={styles.blank}
            type='text'
            pattern='[a-zA-Z0-9가-힣]'
            name='notification'
            onChange={inputChangeHandler}
            value={userNoti?.notification}
            placeholder={'특정 유저에게 전달할 알림을 입력해주세요'}
          />
        </label>

        <div className={styles.btns}>
          <button
            className={userNoti ? `${styles.hide}` : `${styles.btn}`}
            onClick={finishEditHandler}
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
