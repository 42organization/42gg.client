import { FiAlertTriangle } from 'react-icons/fi';
import { useResetRecoilState } from 'recoil';
import styles from 'styles/admin/modal/DeletePenaltyModal.module.scss';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';

export default function DeletePenaltyModal({ intraId }: { intraId: string }) {
  const resetModal = useResetRecoilState(modalState);
  const deletePenalty = async (intraId: string) => {
    await instanceInManage.delete(`/penalty/${intraId}`);
    resetModal();
  };
  return (
    <div className={styles.modalWrap}>
      <div className={styles.body}>
        <div>
          <FiAlertTriangle size={42} color={'red'} />
        </div>
        <div className={styles.content}>{intraId}의 패널티 삭제할건가?</div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.first}`}
            onClick={() => deletePenalty(intraId)}
          >
            확인
          </button>
          <button
            className={`${styles.btn} ${styles.second}`}
            onClick={resetModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
