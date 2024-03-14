import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ApplicationFormType, refMap } from 'types/recruit/recruitments';
import { applicationFormCheck } from 'utils/handleApplicationForm';
import {
  applicationAlertState,
  applicationModalState,
  userApplicationAnswerState,
} from 'utils/recoil/application';
import applicationStyle from 'styles/recruit/application.module.scss';
import commonStyle from 'styles/recruit/common.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

interface IApplicationFormHeaderProps {
  mode: ApplicationFormType;
  setMode: Dispatch<SetStateAction<ApplicationFormType>>;
  formRefs: MutableRefObject<refMap>;
}

const ApplicationFormHeader = (props: IApplicationFormHeaderProps) => {
  const { mode, setMode, formRefs } = props;
  const setAlertOn = useSetRecoilState(applicationAlertState);
  const setModalOpen = useSetRecoilState(applicationModalState);
  const userAnswers = useRecoilValue(userApplicationAnswerState);

  const title =
    mode === 'APPLY'
      ? '지원서 작성'
      : mode === 'VIEW'
      ? '지원서 보기'
      : '지원서 수정';
  const editSubmit = mode === 'EDIT' ? '제출하기' : '수정하기';

  const cancelClick = () => {
    // todo: 취소 요청 넣기
  };

  const editSubmitClick = () => {
    if (mode === 'VIEW') {
      setMode('EDIT');
      return;
    }
    applicationFormCheck({
      formRefs,
      setAlertOn,
      setModalOpen,
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
