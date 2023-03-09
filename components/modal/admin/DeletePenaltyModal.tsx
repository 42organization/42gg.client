import { FiAlertTriangle } from 'react-icons/fi';
import styles from 'styles/admin/modal/DeletePenaltyModal.module.scss';

export default function DeletePenaltyModal({ intraId }: { intraId: string }) {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.body}>
        <div>
          <FiAlertTriangle size={42} color={'red'} />
        </div>
        <div className={styles.content}>{intraId}의 패널티 삭제할건가?</div>
        <div className={styles.btns}>
          <button className={`${styles.btn} ${styles.first}`}>확인</button>
          <button className={`${styles.btn} ${styles.second}`}>취소</button>
        </div>
      </div>
    </div>
  );
}
