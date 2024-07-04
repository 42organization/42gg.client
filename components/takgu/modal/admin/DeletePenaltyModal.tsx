import { useResetRecoilState } from 'recoil';
import { FiAlertTriangle } from 'react-icons/fi';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/takgu/modal';
import styles from 'styles/takgu/admin/modal/DeletePenaltyModal.module.scss';

export default function DeletePenaltyModal({
  intraId,
  penaltyId,
}: {
  intraId: string;
  penaltyId: number;
}) {
  const resetModal = useResetRecoilState(modalState);
  const deletePenalty = async (penaltyId: number) => {
    await instanceInManage.delete(`/penalty/${penaltyId}`);
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
            onClick={() => deletePenalty(penaltyId)}
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
