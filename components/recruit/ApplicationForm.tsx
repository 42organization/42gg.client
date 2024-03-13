import { useRouter } from 'next/router';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Alert, Box, Button, Grid, Paper, Snackbar } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  IRefs,
} from 'types/recruit/recruitments';
import ApplyModal from 'components/modal/recruitment/ApplyModal';
import ApplicationQuestions from 'components/recruit/ApplicationQuestions';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IApplicationFormProps {
  recruitId: number;
  applicationId: number;
  mode: ApplicationFormType;
}

export default function ApplicationForm(props: IApplicationFormProps) {
  const { recruitId, applicationId, mode } = props;
  const { data, isLoading } = useRecruitDetail({ recruitId });
  const formRefs = useRef<IRefs[]>([]);
  const { answerList, setAnswerList } = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [answers, setAnswers] = useState<IApplicantAnswer[]>([]);
  const [alertOn, setAlertOn] = useState(false);

  const closeAlert = () => {
    setAlertOn(false);
  };

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      setAlertOn(true);
    } else {
      const len = data.form.length;
      const arr = Array.from({ length: len }, () => []);
      setAnswerList(arr);
    }
  }, [data, setAnswerList]);

  if (isLoading || !data || Object.keys(data).length === 0) {
    return (
      <NoData isLoading={isLoading} alertOn={alertOn} closeAlert={closeAlert} />
    );
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
        <ApplicationQuestions
          data={data}
          refs={formRefs}
          mode={mode}
          recruitId={recruitId}
          applicationId={applicationId}
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
        <Button
          className={applicationStyle.submitBtn}
          variant='contained'
          onClick={() =>
            applicationFormCheck({
              formRefs,
              setAlertOn,
              setModalOpen,
              setAnswers,
              numberOfQuestions: data?.form.length,
            })
          }
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
      <SnackBar
        alertOn={alertOn}
        closeAlert={closeAlert}
        message='입력하지 않은 문항이 있습니다.'
      />
    </Box>
  );
}

interface INoDataProps {
  isLoading: boolean;
  alertOn: boolean;
  closeAlert: () => void;
}

function NoData(props: INoDataProps) {
  const { isLoading, alertOn, closeAlert } = props;
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
            {isLoading ? '로딩중...' : ''}
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
      <SnackBar
        alertOn={alertOn}
        closeAlert={closeAlert}
        message='올바르지 않은 요청입니다.'
      />
    </Box>
  );
}

interface ISnackBarProps {
  alertOn: boolean;
  closeAlert: () => void;
  message: string;
}

function SnackBar(props: ISnackBarProps) {
  const { alertOn, closeAlert, message } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={alertOn}
      autoHideDuration={5000}
      onClose={closeAlert}
    >
      <Alert onClose={closeAlert} severity='error' variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
}

interface IapplicationFormCheckProps {
  formRefs: MutableRefObject<IRefs[]>;
  setAlertOn: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setAnswers: Dispatch<SetStateAction<IApplicantAnswer[]>>;
  numberOfQuestions: number;
}

const applicationFormCheck = (props: IapplicationFormCheckProps) => {
  const { formRefs, setAlertOn, setModalOpen, setAnswers, numberOfQuestions } =
    props;

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
        const foundObj = answerList.find((obj) => obj.questionId === answer.id);
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

  if (answerList.length === 0 || answerList.length !== numberOfQuestions)
    return;
  setAnswers(answerList);
  setModalOpen(true);
};
