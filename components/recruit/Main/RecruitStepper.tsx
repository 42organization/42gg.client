import {
  CheckCircleRounded,
  FlagCircleRounded,
  Circle,
} from '@mui/icons-material';
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  stepLabelClasses,
  styled,
} from '@mui/material';
import { resultType } from 'types/recruit/recruitments';
import style from 'styles/recruit/Main/myRecruitment.module.scss';

const RecruitStepper = ({ status }: { status: resultType }) => {
  return (
    <Stepper
      className={style.stepper}
      activeStep={statusToStep(status)}
      alternativeLabel
      connector={<StyledConnector />}
    >
      {stepMessage.map((label) => {
        if (status === 'APPLICATION_FAIL' && label === '면접') return null; // 지원서 불합격 시 면접 단계 제거
        return (
          <Step key={label}>
            <StyledLabel StepIconComponent={StepIcon}>{label}</StyledLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

const stepMessage = ['지원서 확인', '면접', '결과 발표'];

const statusToStep = (status: resultType) => {
  if (status === 'PROGRESS') return 0;
  if (status === 'INTERVIEW' || status === 'APPLICATION_FAIL') return 1; // 면접 전 상태
  if (status === 'PASS' || status === 'INTERVIEW_FAIL') return 2; // 면접 후 상태
  return 0;
};

const StepIcon = ({ active, completed }: StepIconProps) => {
  if (completed) {
    return <CheckCircleRounded color={'primary'} />;
  }
  if (active) {
    return <FlagCircleRounded color={'primary'} />;
  }
  return <Circle color={'secondary'} />;
};

const StyledConnector = styled(StepConnector)(({ theme }) => ({
  [`.${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`.${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`.${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledLabel = styled(StepLabel)(({ theme }) => ({
  [`.${stepLabelClasses.alternativeLabel}`]: {
    color: theme.palette.secondary.main,
    fontSize: '0.75rem',
  },
  [`.${stepLabelClasses.active}`]: {
    color: `${theme.palette.primary.dark} !important`,
  },
  [`.${stepLabelClasses.completed}`]: {
    color: `${theme.palette.primary.dark} !important`,
  },
}));

export default RecruitStepper;
