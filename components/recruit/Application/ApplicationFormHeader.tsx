import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { applicationFormCheck } from 'utils/handleApplicationForm';
import {
  applicationAlertState,
  applicationFormTypeState,
  applicationInvalidInput,
  applicationModalState,
  userApplicationAnswerState,
} from 'utils/recoil/application';
import applicationStyle from 'styles/recruit/application.module.scss';

const ApplicationFormHeader = () => {
  const [mode, setMode] = useRecoilState(applicationFormTypeState);
  const setAlertState = useSetRecoilState(applicationAlertState);
  const setModalState = useSetRecoilState(applicationModalState);
  const userAnswers = useRecoilValue(userApplicationAnswerState);
  const setInvalidInput = useSetRecoilState(applicationInvalidInput);

  const title =
    mode === 'APPLY'
      ? '지원서 작성'
      : mode === 'VIEW'
      ? '지원서 보기'
      : '지원서 수정';
  const editSubmit = mode === 'EDIT' ? '제출하기' : '수정하기';

  const cancelClick = () => {
    setModalState({ state: true, content: 'CANCEL' });
  };

  const editSubmitClick = () => {
    if (mode === 'VIEW') {
      setMode('EDIT');
      return;
    }
    applicationFormCheck({
      setInvalidInput,
      setAlertState,
      setModalState,
      userAnswers,
    });
  };

  return (
    <div className={applicationStyle.stickyHeader}>
      <div className={applicationStyle.stickyContainer}>
        <span className={applicationStyle.pageTitle}>{title}</span>
        <div className={applicationStyle.btnContainer}>
          {mode !== 'APPLY' && (
            <>
              <Button
                variant='contained'
                className={applicationStyle.cancelBtn}
                onClick={() => cancelClick()}
              >
                지원 취소
              </Button>
              <Button
                variant='contained'
                className={applicationStyle.editBtn}
                onClick={() => editSubmitClick()}
              >
                {editSubmit}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormHeader;
