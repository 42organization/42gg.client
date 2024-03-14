import { Button } from '@mui/material';
import { ApplicationFormType } from 'types/recruit/recruitments';
import applicationStyle from 'styles/recruit/application.module.scss';
import commonStyle from 'styles/recruit/common.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

const ApplicationFormHeader = ({ mode }: { mode: ApplicationFormType }) => {
  const title =
    mode === 'APPLY'
      ? '지원서 작성'
      : mode === 'VIEW'
      ? '지원서 보기'
      : '지원서 수정';
  const editSubmit = mode === 'EDIT' ? '제출하기' : '수정하기';
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
              >
                지원 취소
              </Button>
              <Button variant='contained' className={applicationStyle.editBtn}>
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
