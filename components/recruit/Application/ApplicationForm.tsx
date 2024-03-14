import { useRouter } from 'next/router';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Alert, Box, Button, Grid, Paper, Snackbar } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  refMap,
} from 'types/recruit/recruitments';
import { applicationFormCheck } from 'utils/handleApplicationForm';
import { userApplicationAnswerState } from 'utils/recoil/application';
import ApplyModal from 'components/modal/recruitment/ApplyModal';
import ApplicationFormItem from 'components/recruit/Application/ApplicationFormItem';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import useRecruitDetailUser from 'hooks/recruit/useRecruitDetailUser';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IApplicationFormProps {
  recruitId: number;
  applicationId: number;
  mode: ApplicationFormType;
}

export default function ApplicationForm(props: IApplicationFormProps) {
  const { recruitId, applicationId, mode } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const formRefs = useRef<refMap>({});
  const setUserAnswers = useSetRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  const { data, isLoading } = useRecruitDetail({ recruitId });
  const { data: userApplyInfo, isLoading: userAnswerLoading } =
    useRecruitDetailUser({
      recruitId: recruitId,
      applicationId: applicationId,
      mode,
    });

  const closeAlert = () => {
    setAlertOn(false);
  };

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      setAlertOn(true);
    }
  }, [data]);

  // 지원서 보기, 수정모드 => 유저 답변 데이터 가져와서 세팅
  useEffect(() => {
    if (mode === 'VIEW' || mode === 'EDIT') {
      if (!userAnswerLoading && userApplyInfo)
        setUserAnswers(userApplyInfo.form);
    } else {
      setUserAnswers([]);
    }
  }, [mode, userAnswerLoading]);

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
        <ApplicationFormItem formRefs={formRefs} data={data} mode={mode} />
        <SubmitButton
          formRefs={formRefs}
          setAlertOn={setAlertOn}
          setModalOpen={setModalOpen}
          mode={mode}
        />
      </Grid>
      <ApplyModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        recruitId={recruitId}
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

interface ISubmitButtonProps {
  formRefs: MutableRefObject<refMap>;
  setAlertOn: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  mode: ApplicationFormType;
}

function SubmitButton(props: ISubmitButtonProps) {
  const { formRefs, setAlertOn, setModalOpen, mode } = props;
  const userAnswers = useRecoilValue<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  if (mode !== 'APPLY') return <></>;
  return (
    <>
      <Button
        className={applicationStyle.submitBtn}
        variant='contained'
        onClick={() =>
          applicationFormCheck({
            formRefs,
            setAlertOn,
            setModalOpen,
            userAnswers,
          })
        }
      >
        제출하기
      </Button>
    </>
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
