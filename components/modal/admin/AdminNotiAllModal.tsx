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
      message: `성공적으로 전송되었습니다! ${notiContent.current?.value}`,
      clicked: true,
    });
    // TODO : 실제 서버에 요청 보내기
  }, []);

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>모두에게 적용</div>
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
              handleClick();
              setModal({ modalName: null });
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
