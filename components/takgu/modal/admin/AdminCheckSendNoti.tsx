import { useSetRecoilState } from 'recoil';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/takgu/admin/modal/AdminCheckSendNoti.module.scss';

interface IsendNoti {
  intraId: string;
  detailContent: string;
}

export default function AdminCheckSendNotiModal(props: IsendNoti) {
  const { intraId, detailContent } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const content = detailContent === 'megaphone' ? '확성기' : '프로필 이미지';

  const sendNotificationHandler = async () => {
    const notiContent = `${content} 내용이 부적절하여 관리자에 의해 삭제되었습니다.`;

    try {
      await instanceInManage.post(`/notifications`, {
        intraId: intraId,
        message: notiContent,
      });
      setSnackBar({
        toastName: 'noti user',
        severity: 'success',
        message: `${content} 삭제 알림이 성공적으로 전송되었습니다!`,
        clicked: true,
      });
    } catch (e) {
      setSnackBar({
        toastName: 'noti user',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
    setModal({ modalName: null });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>알림 전송</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraText}>
            <span className={styles.intraId}>{intraId}</span>
            님에게
          </div>
          <div className={styles.text}>
            {content} 삭제 알림을 보내시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.deleteBtn}
            onClick={() => sendNotificationHandler()}
          >
            보내기
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
