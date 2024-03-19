import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Button, Grid, Paper } from '@mui/material';
import { IApplicantAnswer, refMap } from 'types/recruit/recruitments';
import {
  applicationAnswerDefault,
  applicationFormCheck,
} from 'utils/handleApplicationForm';
import {
  applicationAlertState,
  applicationFormTypeState,
  applicationInvalidInput,
  applicationModalState,
  userApplicationAnswerState,
  userApplicationInfo,
} from 'utils/recoil/application';
import ApplyModal from 'components/modal/recruitment/ApplyModal';
import CancelModal from 'components/modal/recruitment/CancelModal';
import ApplicationFormItem from 'components/recruit/Application/ApplicationFormItem';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import useRecruitDetailUser from 'hooks/recruit/useRecruitDetailUser';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IApplicationFormProps {
  recruitId: number;
  applicationId: number;
}

export default function ApplicationForm(props: IApplicationFormProps) {
  const { recruitId, applicationId } = props;
  const formRefs = useRef<refMap>({});

  const mode = useRecoilValue(applicationFormTypeState);
  const setAlertState = useSetRecoilState(applicationAlertState);
  const modalState = useRecoilValue(applicationModalState);
  const [invalidInput, setInvalidInput] = useRecoilState(
    applicationInvalidInput
  );
  const setUserAnswers = useSetRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );
  const setUserApplicationInfo = useSetRecoilState(userApplicationInfo);

  const { data, isLoading } = useRecruitDetail({ recruitId });
  const { data: userApplyInfo, isLoading: userAnswerLoading } =
    useRecruitDetailUser({
      recruitId: recruitId,
      applicationId: applicationId,
      mode,
    });

  // 데이터 잘 들어온 경우 recoil 데이터 세팅
  useEffect(() => {
    if (!isLoading) {
      if (!data || (data && !Object.keys(data).length)) {
        setAlertState({
          alertState: true,
          message: '올바르지 않은 요청입니다.',
          severity: 'error',
        });
        return;
      }
      if (data) {
        setUserApplicationInfo({ recruitId: recruitId });
        setUserAnswers(applicationAnswerDefault(data?.forms));
      }
    }
  }, [isLoading, data]);

  // 입력하지 않은 문항으로 이동
  useEffect(() => {
    if (invalidInput !== -1) {
      formRefs.current[invalidInput].focus();
      setInvalidInput(-1);
    }
  }, [invalidInput]);

  // 지원서 보기, 수정 모드에서는 기존 유저가 제출한 데이터 가져옴
  useEffect(() => {
    if (mode === 'VIEW' || mode === 'EDIT') {
      if (!userAnswerLoading && userApplyInfo) {
        setUserAnswers(userApplyInfo.forms);
        setUserApplicationInfo({
          recruitId: recruitId,
          applicationId: userApplyInfo.applicationId,
        });
      }
    }
  }, [mode, userAnswerLoading]);

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
        <Paper className={applicationStyle.titleContainer}>{data.title}</Paper>
        <ApplicationFormItem formRefs={formRefs} data={data} />
        <SubmitButton />
      </Grid>
      {modalState.content === 'APPLY' ? <ApplyModal /> : <CancelModal />}
    </Box>
  );
}

interface INoDataProps {
  isLoading: boolean;
}

function NoData(props: INoDataProps) {
  const { isLoading } = props;
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
    </Box>
  );
}

function SubmitButton() {
  const mode = useRecoilValue(applicationFormTypeState);
  const userAnswers = useRecoilValue<IApplicantAnswer[]>(
    userApplicationAnswerState
  );
  const setAlertState = useSetRecoilState(applicationAlertState);
  const setModalState = useSetRecoilState(applicationModalState);
  const setInvalidInput = useSetRecoilState(applicationInvalidInput);

  if (mode !== 'APPLY') return <></>;
  return (
    <>
      <Button
        className={applicationStyle.submitBtn}
        variant='contained'
        onClick={() =>
          applicationFormCheck({
            setInvalidInput,
            setAlertState,
            setModalState,
            userAnswers,
          })
        }
      >
        제출하기
      </Button>
    </>
  );
}
