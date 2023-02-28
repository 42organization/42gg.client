import { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import instance from 'utils/axios';
import { finished } from 'stream';
import styles from 'styles/admin/modal/AdminNoti.module.scss';

//noti가 비어있을 때 적용안되게 수정필요

export default function AdminNotiUserModal(props: any) {
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
        <div className={styles.titleText}>Noti For {props.value}</div>
        <hr className={styles.hr} />
      </div>
      <label className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>intra ID</div>
            <textarea
              className={styles.intraBlank}
              name='intraID'
              placeholder={'intra ID를 입력하세요'}
            />
          </div>
          <div className={styles.messageWrap}>
            <div className={styles.bodyText}>message</div>
            <textarea
              className={styles.messageBlank}
              name='notification'
              ref={notiContent}
              placeholder={'전달할 알림을 입력해주세요'}
            />
          </div>
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
