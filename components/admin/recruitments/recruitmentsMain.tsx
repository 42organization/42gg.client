import RecruitmentsHistoryList from 'components/admin/recruitments/recruitmentsHistoryList';
import styles from 'styles/admin/store/StoreMain.module.scss';

function RecruitmentsMain() {
  //return menutab
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <button className={styles.sectionTitle}>지원 공고 등록</button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <RecruitmentsHistoryList />
      </div>
    </div>
  );
}

export default RecruitmentsMain;
