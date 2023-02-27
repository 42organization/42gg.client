import { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminNotiAll.module.scss';

export default function AdminNotiAllModal() {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const notiContent = useRef<HTMLTextAreaElement>(null);

  const handleClick = useCallback(() => {
    setSnackBar({
      toastName: 'noti all',
      severity: 'success',
      message: `Successfully Sent! ${notiContent.current?.value}`,
      clicked: true,
    });
    // TODO : 실제 서버에 요청 보내기
  }, []);

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>NOTI FOR ALL</div>

        <label className={styles.body}>
          <textarea
            className={styles.blank}
            name='notification'
            ref={notiContent}
            placeholder={'모두에게 전달할 알림을 입력해주세요'}
          />
        </label>

        <div className={styles.btns}>
          <button
            onClick={() => {
              handleClick();
              setModal({ modalName: null });
            }}
            className={styles.btn}
          >
            적용
          </button>
          <button
            className={styles.btn}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
