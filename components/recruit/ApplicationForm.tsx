import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Snackbar } from '@mui/material';
import { IApplicantAnswer, IRefs } from 'types/recruit/recruitments';
import ApplyModal from 'components/modal/recruitment/ApplyModal';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import applicationStyle from 'styles/recruit/application.module.scss';
import ApplicationQuestions from './ApplicationQuestions';

export default function ApplicationForm({ recruitId }: { recruitId: number }) {
  const { data, isLoading } = useRecruitDetail({ recruitId });
  const formRefs = useRef<IRefs[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [answers, setAnswers] = useState<IApplicantAnswer[]>([]);
  const [alertOn, setAlertOn] = useState(false);

  // todo: 응답하지 않은 질문으로 포커싱 필요?
  const submitApplicationForm = () => {
    const answerList = [];
    for (const answer of formRefs.current) {
      let requiredFlag = false;
      if (answer.type === 'TEXT' && answer.ref[0].value.length !== 0) {
        answerList.push({
          questionId: answer.id,
          inputType: answer.type,
          answer: answer.ref[0].value,
        });
        requiredFlag = true;
      } else if (answer.type === 'SINGLE_CHECK') {
        for (const checkRef of answer.ref) {
          if (!checkRef || checkRef?.checked === false) continue;
          answerList.push({
            questionId: answer.id,
            inputType: answer.type,
            checkList: [Number(answer.ref.indexOf(checkRef))],
          });
          requiredFlag = true;
          break;
        }
      } else if (answer.type === 'MULTI_CHECK') {
        for (const checkRef of answer.ref) {
          if (!checkRef || checkRef?.checked === false) continue;
          const foundObj = answerList.find(
            (obj) => obj.questionId === answer.id
          );
          if (foundObj === undefined) {
            answerList.push({
              questionId: answer.id,
              inputType: answer.type,
              // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
              checkedList: [Number(answer.ref.indexOf(checkRef))],
            });
          } else {
            // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
            foundObj.checkedList?.push(Number(answer.ref.indexOf(checkRef)));
          }
          requiredFlag = true;
        }
      }

      // 채워지지 않은 폼으로 이동
      if (!requiredFlag) {
        if (answer.type === 'TEXT') {
          answer.ref[0].focus();
        } else {
          // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
          answer.ref[1].focus();
        }
        setAlertOn(true);
        return;
      }
    }
    // test용 console
    console.log(
      '폼 질문 개수: ',
      data?.form.length,
      ' 응답 개수: ',
      answerList.length
    );
    console.log('응답: ', answerList);
    if (answerList.length === 0 || answerList.length !== data?.form.length)
      return;
    setAnswers(answerList);
    setModalOpen(true);
  };

  if (isLoading || !data || Object.keys(data).length === 0) {
    return <NoData isLoading={isLoading} />;
  }

  return (
    <Box>
      <Grid
        className={applicationStyle.form}
        container
        direction={'column'}
        rowSpacing={2}
      >
        <Paper className={applicationStyle.titleContainer}>
          {data.title} {data.generations} 모집
        </Paper>
        <ApplicationQuestions data={data} refs={formRefs} />
        <Button
          className={applicationStyle.submitBtn}
          variant='contained'
          onClick={() => submitApplicationForm()}
        >
          제출하기
        </Button>
      </Grid>
      <ApplyModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        recruitId={recruitId}
        applicantAnswers={answers}
      />
      <SnackBar alertOn={alertOn} setAlertOn={setAlertOn} />
    </Box>
  );
}

function NoData({ isLoading }: { isLoading: boolean }) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Box>
      <Grid className={applicationStyle.form}>
        <Paper className={applicationStyle.titleContainer}>42GG 모집</Paper>
        <Paper className={applicationStyle.questionContainer}>
          <div className={applicationStyle.backTitle}>
            {isLoading ? '로딩중...' : '지원서 항목이 없습니다'}
          </div>
          <Button
            className={applicationStyle.backBtn}
            variant='contained'
            onClick={goBack}
          >
            뒤로가기
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
}

function SnackBar({
  alertOn,
  setAlertOn,
}: {
  alertOn: boolean;
  setAlertOn: Dispatch<SetStateAction<boolean>>;
}) {
  const closeAlert = () => {
    setAlertOn(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={alertOn}
      autoHideDuration={5000}
      onClose={closeAlert}
    >
      <Alert onClose={closeAlert} severity='error' variant='filled'>
        빈칸을 채워주세요
      </Alert>
    </Snackbar>
  );
}
