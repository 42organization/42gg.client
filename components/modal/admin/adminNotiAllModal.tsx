import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminNotiAll.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import { finished } from 'stream';

interface EditedAllNoti {
  notification: string | number;
}

//noti가 비어있을 때 적용안되게 수정필요

const MINUTE_LIMIT = 59;

export default function AdminNotiAllModal(props: any) {
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

  const getBasicNotiAllHandler = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/users/intraId/penalty`
      /* noti 모달인데 패널티 api를 불러옴 post요청인데 애초에 fetch로 정보 불러온게 이상 */
    );
    const data = await res.json();
    setAllNoti(data[0]);
  };

  // useEffect(() => {
  //   getBasicPenaltyHandler();
  // }, []);
  const finishEditHandler = () => {
    let errMsg = '';
    if (editedAllNoti.notification < 0) {
      errMsg += '시간은 0 이상이어야합니다.\n';
      console.log(errMsg);
      editedAllNoti.notification = '';
    }
    if (errMsg) alert(errMsg);
    setAllNoti({
      ...editedAllNoti,
      intraID: props.value,
    });
    // setModal({ modalName: null });
  };
  useEffect(() => {
    console.log({ allNoti });
    return () => {
      console.log({ allNoti });
    };
  }, [allNoti]);
  const setModal = useSetRecoilState(modalState);
  const cancelEditHandler = () => setModal({ modalName: null });

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>NOTI FOR ALL</div>

        <label className={styles.body}>
          To: everyone
          <input
            className={styles.blank}
            type='text'
            pattern='[a-zA-Z0-9가-힣]'
            name='notification'
            onChange={inputChangeHandler}
            value={allNoti?.notification}
            placeholder={'모두에게 전달할 알림을 입력해주세요'}
          />
        </label>

        <div className={styles.btns}>
          <button
            className={allNoti ? `${styles.hide}` : `${styles.btn}`}
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
