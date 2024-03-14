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
  styled,
} from '@mui/material';
import { resultType } from 'types/recruit/recruitments';
import style from 'styles/recruit/Main/myRecruitment.module.scss';

const RecruitStepper = ({
  status,
  interviewDate,
}: {
  status: resultType;
  interviewDate?: Date;
}) => {
  return (
    <Stepper
      className={style.stepper}
      activeStep={statusToStep(status, interviewDate)}
      alternativeLabel
      connector={<ConnectLine />}
    >
      {stepMessage.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const stepMessage = ['지원서 확인', '면접', '결과 발표'];

const statusToStep = (status: resultType, interviewDate?: Date) => {
  if (status === 'PROGRESS' && !interviewDate) return 0; // '지원서 확인'
  if (status === 'PROGRESS' && interviewDate) return 1; // '면접'
  if (status === 'PASS' || status === 'FAIL') return 2;
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

const ConnectLine = styled(StepConnector)(({ theme }) => ({
  [`.${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`.${stepConnectorClasses.disabled}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.light,
    },
  },
}));

export default RecruitStepper;
