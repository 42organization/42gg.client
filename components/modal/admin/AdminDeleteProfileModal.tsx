import { useSetRecoilState } from 'recoil';
import { Iprofile } from 'types/admin/adminReceiptType';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/admin/modal/AdminDeleteProfile.module.scss';

export default function AdminDeleteProfileModal(props: Iprofile) {
  const { id, userIntraId, imageUri } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const errorResponse: { [key: string]: string } = {
    UR100: '존재하지 않는 유저입니다.',
  };

  const deleteProfileHandler = async (userId: string) => {
    try {
      await instanceInManage.delete(`/users/images/${userIntraId}`);
      setSnackBar({
        toastName: 'delete profile',
        severity: 'success',
        message: `${id}번 ${userId}님의 프로필 이미지가 삭제되었습니다.`,
        clicked: true,
      });
      setModal({
        modalName: 'ADMIN-CHECK_SEND_NOTI',
        intraId: userIntraId,
        detailContent: 'profile',
      });
    } catch (e: any) {
      if (e.response.data.code in errorResponse) {
        setSnackBar({
          toastName: 'delete profile',
          severity: 'error',
          message: errorResponse[e.response.data.code],
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'delete profile',
          severity: 'error',
          message: `API 요청에 문제가 발생했습니다.`,
          clicked: true,
        });
      }
      setModal({ modalName: null });
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>프로필 삭제</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>현재 프로필 :</div>
            <div className={styles.profileImage}>
              <PlayerImage
                src={imageUri}
                size={18}
                styleName={'mainPageProfile'}
              />
            </div>
          </div>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>사용자 :</div>
            <input className={styles.intraBlank} value={userIntraId} readOnly />
          </div>
          <div className={styles.checkWrap}>
            <div className={styles.checkTextMain}>
              {id}번 {userIntraId}님의 프로필을 삭제하시겠습니까?
            </div>
            <div className={styles.checkTextSub}>
              해당 유저의 이전 이미지로 수정됩니다.
            </div>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteProfileHandler(userIntraId)}
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
