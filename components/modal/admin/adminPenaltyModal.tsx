import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminPenalty.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import { finished } from 'stream';
import { useRouter } from 'next/router';

interface EditedPenalty {
  reason: string;
  penaltyHour: number;
  penaltyMinute: number;
  // presentPath: boolean;
}

const MINUTE_LIMIT = 59;

export default function AdminPenaltyModal(props: any) {
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

  const getBasicPenaltyHandler = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/users/intraId/penalty`
    );
    const data = await res.json();
    setUserPenalty(data[0]);
  };

  // useEffect(() => {
  //   getBasicPenaltyHandler();
  // }, []);

  const finishEditHandler = () => {
    let errMsg = '';
    if (editedPenalty.penaltyHour < 0) {
      errMsg += '시간은 0 이상이어야합니다.\n';
      console.log(errMsg);
      editedPenalty.penaltyHour = parseInt('', 10);
    }
    if (editedPenalty.penaltyMinute < 0) {
      errMsg += '분은 0 이상이어야합나다\n';
      editedPenalty.penaltyMinute = parseInt('', 10);
    }
    if (editedPenalty.penaltyMinute > MINUTE_LIMIT) {
      errMsg += '분은 59분까지 입력 가능합니다.\n';
      editedPenalty.penaltyMinute = parseInt('', 10);
    }
    //useState를 이용해서 errMsg 관리하는게 더 좋음!
    //+)alert가 아닌 모달의 하단부에 errMsg가 나타나도록 적용해볼것
    if (errMsg) alert(errMsg);
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
        <div className={styles.title}>intra ID: {props.value}</div>

        <label className={styles.body}>
          사유
          <div>
            {userPenalty ? (
              <input
                className={styles.unfocus}
                value={userPenalty.reason}
                readOnly
              />
            ) : (
              <input
                type='text'
                pattern='[a-zA-Z0-9가-힣]'
                name='reason'
                onChange={inputChangeHandler}
                value={userPenalty?.reason}
                placeholder={'사유를 입력해주세요'}
              />
            )}
          </div>
        </label>

        <label className={styles.body}>
          시간
          <div>
            {userPenalty ? (
              <input
                className={styles.unfocus}
                value={userPenalty.penaltyHour}
                readOnly
              />
            ) : (
              <input
                type='number'
                pattern='[0-9]+'
                min='1'
                name='penaltyHour'
                onChange={inputChangeHandler}
                value={userPenalty?.penaltyHour}
                placeholder={'시간을 입력해주세요'}
              />
            )}
          </div>
        </label>

        <label className={styles.body}>
          분
          <div>
            {userPenalty ? (
              <input
                className={styles.unfocus}
                value={userPenalty.penaltyMinute}
                readOnly
              />
            ) : (
              <input
                type='number'
                pattern='[0-9]+'
                min='1'
                name='penaltyMinute'
                onChange={inputChangeHandler}
                value={userPenalty?.penaltyMinute}
                placeholder={'분을 입력해주세요'}
              />
            )}
          </div>
        </label>
        <div className={styles.btns}>
          <button
            className={userPenalty ? `${styles.hide}` : `${styles.btn}`}
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
