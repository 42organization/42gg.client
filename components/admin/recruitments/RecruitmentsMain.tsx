import { Dispatch, SetStateAction } from 'react';
import styles from 'styles/admin/store/StoreMain.module.scss';
import RecruitmentEdit from './recruitmentsEdit/RecruitmentEdit';
import RecruitmentsHistoryList from './RecruitmentsHistoryList';

interface RecruitmentsMainProps {
  setPageType: Dispatch<SetStateAction<'MAIN' | 'EDIT'>>;
}

function RecruitmentsMain({ setPageType }: RecruitmentsMainProps) {
  //return menutab
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <button
          className={styles.sectionTitle}
          onClick={() => {
            setPageType('EDIT');
          }}
        >
          지원 공고 등록
        </button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <RecruitmentsHistoryList />
      </div>
    </div>
  );
}

export default RecruitmentsMain;
