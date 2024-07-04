import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ApplicationFormType } from 'types/recruit/recruitments';
import { applicationModalState } from 'utils/recoil/application';
import styles from 'styles/takgu/recruit/application.module.scss';

interface IApplicationFormFooterProps {
  mode: ApplicationFormType;
  setMode: Dispatch<SetStateAction<ApplicationFormType>>;
}

function ApplicatoinFormFooter(props: IApplicationFormFooterProps) {
  const { mode, setMode } = props;
  const setModalState = useSetRecoilState(applicationModalState);

  return (
    <div className={styles.stickyFooter}>
      <div className={styles.stickyContainer}>
        <div className={styles.btnContainer}>
          <Button
            variant='contained'
            className={styles.cancelBtn}
            onClick={() =>
              setModalState({ state: true, content: 'CANCEL', formData: [] })
            }
          >
            지원 취소
          </Button>
          {mode === 'VIEW' ? (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicatoinFormFooter;
