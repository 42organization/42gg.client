import { useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, Button, Grid, Paper } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  IQuestionForm,
  IRecruitmentDetail,
  refMap,
} from 'types/takgu/recruit/recruitments';
import { applicationAnswerSet } from 'utils/takgu/handleApplicationForm';
import {
  applicationAlertState,
  applicationModalState,
} from 'utils/takgu/recoil/application';
import ApplyEditModal from 'components/takgu/modal/recruitment/ApplyEditModal';
import CancelModal from 'components/takgu/modal/recruitment/CancelModal';
import MultiCheckForm from 'components/takgu/recruit/Application/applicationFormItems/MultiCheckForm';
import SingleCheckForm from 'components/takgu/recruit/Application/applicationFormItems/SingleCheckForm';
import TextForm from 'components/takgu/recruit/Application/applicationFormItems/TextForm';
import styles from 'styles/takgu/recruit/application.module.scss';

interface IApplicationFormProps {
  mode: ApplicationFormType;
  recuitId: number;
  applicationId: number | null;
  data: IRecruitmentDetail;
  answerList: IApplicantAnswer[] | null;
}

function ApplicationForm(props: IApplicationFormProps) {
  const { mode, recuitId, applicationId, data, answerList } = props;
  const formRefs = useRef<refMap>({});
  const [modalState, setModalState] = useRecoilState(applicationModalState);
  const setAlertState = useSetRecoilState(applicationAlertState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const answerForms = applicationAnswerSet(formData, data.forms);
    // 입력하지 않은 문항으로 이동
    for (const ans of answerForms) {
      if (
        (ans.inputType === 'TEXT' && ans.answer === '') ||
        ((ans.inputType === 'SINGLE_CHECK' ||
          ans.inputType === 'MULTI_CHECK') &&
          !ans.checkedList?.length)
      ) {
        formRefs.current[ans.questionId].focus();
        formRefs.current[ans.questionId].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setAlertState({
          alertState: true,
          message: '입력하지 않은 항목이 있습니다.',
          severity: 'error',
        });
        return;
      }
    }
    setModalState({
      state: true,
      content: mode === 'APPLY' ? 'APPLY' : 'EDIT',
      formData: answerForms,
    });
  };

  return (
    <Box>
      <form id='applicationForm' onSubmit={onSubmit}>
        <Grid
          className={styles.form}
          container
          direction={'column'}
          rowSpacing={2}
        >
          <Paper elevation={3} className={styles.titleContainer}>
            {data.title}
          </Paper>
          {data.forms.map((form: IQuestionForm, index: number) => (
            <div
              key={index}
              tabIndex={index}
              ref={(ref) => ref && (formRefs.current[index] = ref)}
            >
              <Paper
                elevation={3}
                className={styles.questionContainer}
                key={index}
              >
                {form.inputType === 'TEXT' ? (
                  <TextForm
                    form={form}
                    mode={mode}
                    answer={answerList ? answerList[index] : null}
                  />
                ) : form.inputType === 'SINGLE_CHECK' ? (
                  <SingleCheckForm
                    form={form}
                    mode={mode}
                    answer={answerList ? answerList[index] : null}
                  />
                ) : form.inputType === 'MULTI_CHECK' ? (
                  <MultiCheckForm
                    form={form}
                    mode={mode}
                    answer={answerList ? answerList[index] : null}
                  />
                ) : (
                  <span>잘못된 타입의 항목입니다</span>
                )}
              </Paper>
            </div>
          ))}
          {mode === 'APPLY' && (
            <Button
              className={styles.submitBtn}
              variant='contained'
              type='submit'
              form='applicationForm'
            >
              제출하기
            </Button>
          )}
        </Grid>
      </form>
      {modalState.content === 'CANCEL' ? (
        <CancelModal recruitId={recuitId} applicationId={applicationId} />
      ) : (
        <ApplyEditModal
          recruitId={recuitId}
          applicationId={applicationId}
          mode={mode}
        />
      )}
    </Box>
  );
}

export default ApplicationForm;
