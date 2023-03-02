import { useSetRecoilState } from 'recoil';
import { useCallback } from 'react';
import styles from 'styles/admin/modal/AdminPenalty.module.scss';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';

export default function AdminPenaltyModal(props: any) {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const handleClick = useCallback(() => {
    setSnackBar({
      toastName: 'noti all',
      severity: 'success',
      message: `성공적으로 전송되었습니다!`,
      clicked: true,
    });
    // TODO : 실제 서버에 요청 보내기
  }, []);

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>패널티 부여 설정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>intra ID:</div>
            <textarea
              className={styles.intraBlank}
              name='intraID'
              placeholder={'intra ID를 입력하세요'}
            />
          </div>
          <div className={styles.reasonWrap}>
            <div className={styles.bodyText}>사유:</div>
            <textarea
              className={styles.reasonBlank}
              name='reason'
              placeholder={'사유를 입력하세요'}
            />
          </div>
          <div className={styles.durationWrap}>
            <div className={styles.bodyText}>적용기간:</div>
            <textarea
              className={styles.durationBlank}
              name='duration'
              placeholder={'기간을 입력하세요'}
            />
          </div>
          <div className={styles.dateWrap}>
            <div className={styles.bodyText}>해방 날짜:</div>
            <input
              className={styles.dateBlank}
              name='date'
              type='date'
              placeholder='날짜 선택'
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
            적용
          </button>
          <button
            className={styles.btn2}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
