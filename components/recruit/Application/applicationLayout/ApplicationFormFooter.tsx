import { Dispatch, SetStateAction } from 'react';
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
  const setModalState = useSetRecoilState(applicationModalState);

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
          {new Date() < new Date(endDate) &&
          (status === null || status === 'PROGRESS_DOCS') ? (
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
