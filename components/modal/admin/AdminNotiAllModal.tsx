import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import instance from 'utils/axios';
import styles from 'styles/admin/modal/AdminNoti.module.scss';

export default function AdminNotiAllModal() {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const notiContent = useRef<HTMLTextAreaElement>(null);

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
      const res = await instance.post(`pingpong/admin/notifications/`, {
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
        setModal({ modalName: null });
      }
    } catch (e) {
      setSnackBar({
        toastName: 'noti all',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
      setModal({ modalName: null });
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
