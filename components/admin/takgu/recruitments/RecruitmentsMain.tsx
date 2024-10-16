import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { RecruitmentsMainProps } from 'types/admin/takgu/adminRecruitmentsTypes';
import styles from 'styles/admin/takgu/store/StoreMain.module.scss';
import RecruitmentsHistoryList from './RecruitmentsHistoryList';

function RecruitmentsMain({ setPage }: RecruitmentsMainProps) {
  //return menutab
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Button
          variant='contained'
          className={styles.sectionTitle}
          onClick={() => {
            setPage({ pageType: 'EDIT', props: { mode: 'CREATE', setPage } });
          }}
        >
          새 모집공고 등록
        </Button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <RecruitmentsHistoryList setPage={setPage} />
      </div>
    </div>
  );
}

export default RecruitmentsMain;
