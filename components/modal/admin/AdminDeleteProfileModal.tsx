import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { ImegaphoneInfo, IprofileInfo } from 'types/admin/adminReceiptType';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminDeleteProfileModal.module.scss';
import PlayerImage from 'components/PlayerImage';

export default function AdminDeleteProfileModal(props: IprofileInfo) {
  const { profileId, intraId, imageUrl } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  // instanceInManage, try catch로 변경
  const deleteProfileHandler = async (intraId: string) => {
    try {
      await mockInstance.delete(`/admin/users/${intraId}`);
    } catch (e: any) {
      setSnackBar({
        toastName: 'delete profile',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
    setSnackBar({
      toastName: 'delete profile',
      severity: 'success',
      message: `${intraId}님의 프로필이 삭제되었습니다!`,
      clicked: true,
    });
    setModal({ modalName: null });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>프로필 삭제</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>사용자 :</div>
            <input className={styles.intraBlank} value={intraId} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>현재 프로필</div>
            <PlayerImage
              src={imageUrl}
              size={18}
              styleName={'mainPageProfile'}
            />
          </div>
          <div className={styles.checkWrap}>
            {profileId}번 {intraId}님의 프로필을 삭제하시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteProfileHandler(intraId)}
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
