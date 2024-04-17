import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ApplicationFormType, resultType } from 'types/recruit/recruitments';
import { applicationModalState } from 'utils/recoil/application';
import styles from 'styles/recruit/application.module.scss';

interface IApplicationFormFooterProps {
  endDate: string;
  status: resultType;
  mode: ApplicationFormType;
  setMode: Dispatch<SetStateAction<ApplicationFormType>>;
}

function ApplicatoinFormFooter(props: IApplicationFormFooterProps) {
  const { endDate, status, mode, setMode } = props;
  const [closed, setClosed] = useState<boolean>(false);
  const setModalState = useSetRecoilState(applicationModalState);

  useEffect(() => {
    if (new Date() > new Date(endDate)) {
      setClosed(true);
    }
  }, [endDate]);

  return (
    <div className={styles.stickyFooter}>
      <div className={styles.stickyContainer}>
        <div className={styles.btnContainer}>
          {(status === null || status === 'PROGRESS_DOCS') && (
            <Button
              variant='contained'
              className={styles.cancelBtn}
              onClick={() =>
                setModalState({ state: true, content: 'CANCEL', formData: [] })
              }
            >
              지원 취소
            </Button>
          )}
          {!closed && (status === null || status === 'PROGRESS_DOCS') ? (
            mode === 'VIEW' ? (
              <Button
                variant='contained'
                className={styles.editBtn}
                onClick={() => setMode('EDIT')}
              >
                수정하기
              </Button>
            ) : (
              <Button
                variant='contained'
                className={styles.editBtn}
                type='submit'
                form='applicationForm'
              >
                제출하기
              </Button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicatoinFormFooter;
