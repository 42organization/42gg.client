import { Stack } from '@mui/material';
import { resultType } from 'types/recruit/recruitments';
import { dateToKRFullString } from 'utils/handleTime';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import RecruitStepper from './RecruitStepper';

const MyRecruitStatus = ({
  status,
  interviewDate,
}: {
  status?: resultType;
  interviewDate?: Date;
}) => {
  if (!status)
    return (
      <div className={style.collapseContainer}>
        <span>지원 내역이 없습니다.</span>
      </div>
    );

  return (
    <div className={style.collapseContainer}>
      <Stack
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={2}
      >
        <RecruitStepper status={status} interviewDate={interviewDate} />
        <span>{statusMessage(status, interviewDate)}</span>
      </Stack>
    </div>
  );
};

const statusMessage = (status: resultType, interviewDate?: Date) => {
  // 지원서 접수 후 ~ 면접 날짜 발표 전
  if (!interviewDate) {
    return '지원서를 확인하고 있습니다.';
  }
  // 면접 날짜 발표 후 ~ 결과 발표 전
  if (status === 'PROGRESS' && interviewDate) {
    return dateToKRFullString(new Date(interviewDate));
  }
  // 결과 발표 후
  // TODO : 좀 더 괜찮은 표현 찾아보기
  if (status === 'PASS') {
    return '합격';
  }
  if (status === 'FAIL') {
    return '불합격';
  }
  return '';
};

export default MyRecruitStatus;
