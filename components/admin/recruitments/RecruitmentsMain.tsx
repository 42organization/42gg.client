import { Dispatch, SetStateAction } from 'react';
import { RecruitmentsMainProps } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/store/StoreMain.module.scss';
import RecruitmentsHistoryList from './RecruitmentsHistoryList';

function RecruitmentsMain({ setPage }: RecruitmentsMainProps) {
  //return menutab
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <button
          className={styles.sectionTitle}
          onClick={() => {
            setPage({ pageType: 'EDIT', props: { mode: 'CREATE', setPage } });
          }}
        >
          지원 공고 등록
        </button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <RecruitmentsHistoryList setPage={setPage} />
      </div>
    </div>
  );
}

export default RecruitmentsMain;
