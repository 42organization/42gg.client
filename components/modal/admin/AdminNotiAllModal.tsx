import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { instanceInManage } from 'utils/axios';
import styles from 'styles/admin/modal/AdminNoti.module.scss';

const STAT_MSG_LIMIT = 25;

export default function AdminNotiAllModal() {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const notiContent = useRef<HTMLTextAreaElement>(null);

  const inputHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (name === 'notification' && value.length > STAT_MSG_LIMIT)
      setSnackBar({
        toastName: 'noti all',
        severity: 'warning',
        message: `${STAT_MSG_LIMIT}자 이내로 입력하세요`,
        clicked: true,
      });
    return;
  };

  const sendNotificationHandler = async () => {
    if (notiContent.current?.value === '') {
      setSnackBar({
        toastName: 'noti all',
        severity: 'warning',
        message: `알림 내용을 입력해주세요.`,
        clicked: true,
      });
      return;
    }
    try {
      const res = await instanceInManage.post(`/notifications/`, {
        message: notiContent.current?.value
          ? notiContent.current?.value
          : '알림 전송 실패',
      });
      if (res.status === 200) {
        setSnackBar({
          toastName: 'noti all',
          severity: 'success',
          message: `성공적으로 전송되었습니다!`,
          clicked: true,
        });
        setModal({ modalName: null });
      } else {
        setSnackBar({
          toastName: 'noti all',
          severity: 'error',
          message: `전송에 실패하였습니다!`,
          clicked: true,
        });
      }
    } catch (e) {
      setSnackBar({
        toastName: 'noti all',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>전체 알림</div>
        <hr className={styles.hr} />
      </div>
      <label className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.bodyText}>message</div>
          <textarea
            className={styles.blank}
            name='notification'
            ref={notiContent}
            placeholder={'모두에게 전달할 알림을 입력해주세요'}
            maxLength={STAT_MSG_LIMIT}
            onChange={inputHandler}
          />
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              sendNotificationHandler();
            }}
            className={styles.btn1}
          >
            전송
          </button>
          <button
            className={styles.btn2}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </label>
    </div>
  );
}
