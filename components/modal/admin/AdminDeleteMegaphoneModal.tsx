import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Imegaphone } from 'types/admin/adminReceiptType';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminDeleteMegaphoneModal.module.scss';

export default function AdminDeleteMegaphoneModal(props: Imegaphone) {
  const { megaphoneId, content, intraId } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  // instanceInManage, try catch로 변경
  const deleteMegaphoneHandler = async (megaphoneId: number) => {
    try {
      await mockInstance.delete(`/admin/megaphones/${megaphoneId}`);
    } catch (e: any) {
      if (e.response.status === 403) {
        setSnackBar({
          toastName: 'delete megaphone',
          severity: 'error',
          message: `${megaphoneId}번 확성기는 삭제할 수 없는 확성기입니다.`,
          clicked: true,
        });
        setModal({ modalName: null });
        return;
      } else {
        setSnackBar({
          toastName: 'delete megaphone',
          severity: 'error',
          message: `API 요청에 문제가 발생했습니다.`,
          clicked: true,
        });
        setModal({ modalName: null });
      }
    }
    setSnackBar({
      toastName: 'delete megaphone',
      severity: 'success',
      message: `${megaphoneId}번 확성기가 삭제되었습니다!`,
      clicked: true,
    });
    setModal({ modalName: 'ADMIN-CHECK_SEND_NOTI', intraId: intraId });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>확성기 삭제</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>사용자 :</div>
            <input className={styles.intraBlank} value={intraId} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>확성기 내용 :</div>
            <textarea
              className={styles.contentBlank}
              value={content}
              readOnly
            />
          </div>
          <div className={styles.checkWrap}>
            {megaphoneId} 번 확성기를 삭제하시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteMegaphoneHandler(megaphoneId)}
          >
            삭제
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
