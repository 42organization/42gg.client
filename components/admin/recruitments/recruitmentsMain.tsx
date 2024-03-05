import { Dispatch, SetStateAction } from 'react';
import RecruitmentsHistoryList from 'components/admin/recruitments/recruitmentsHistoryList';
import styles from 'styles/admin/store/StoreMain.module.scss';
import RecruitmentEdit from './recruitmentsEdit/RecruitmentEdit';

interface RecruitmentsMainProps {
  setPage: Dispatch<SetStateAction<JSX.Element>>;
}

function RecruitmentsMain({ setPage }: RecruitmentsMainProps) {
  //return menutab
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <button
          className={styles.sectionTitle}
          onClick={() => {
            setPage(<RecruitmentEdit setPage={setPage} />);
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
