import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ApplicationFormType } from 'types/recruit/recruitments';
import { applicationAlertState } from 'utils/recoil/application';
import ApplicationForm from 'components/recruit/Application/ApplicationForm';
import ApplicatoinFormFooter from 'components/recruit/Application/applicationLayout/ApplicationFormFooter';
import ApplicationFormHeader from 'components/recruit/Application/applicationLayout/ApplicationFormHeader';
import ApplicationLoadingNoData from 'components/recruit/Application/ApplicationLoadingNoData';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import useRecruitDetailUser from 'hooks/recruit/useRecruitDetailUser';

function MyApplication() {
  const router = useRouter();
  const recruitId = parseInt(router.query.id as string);
  const applicationId = parseInt(router.query.applicationId as string);
  const setAlertState = useSetRecoilState(applicationAlertState);
  const [mode, setMode] = useState<ApplicationFormType>('VIEW');

  const { data: recruitDetail, isLoading: recruitDetailLoading } =
    useRecruitDetail(recruitId);
  const { data: userAnswerList, isLoading: userAnswerListLoading } =
    useRecruitDetailUser(recruitId, applicationId);

  useEffect(() => {
    if (
      !recruitDetailLoading &&
      !userAnswerListLoading &&
      (!recruitDetail ||
        !Object.keys(recruitDetail).length ||
        !userAnswerList ||
        !Object.keys(userAnswerList).length)
    ) {
      setAlertState({
        alertState: true,
        message: '올바르지 않은 요청입니다.',
        severity: 'error',
      });
      return;
    }
  }, [
    recruitDetailLoading,
    userAnswerListLoading,
    recruitDetail,
    userAnswerList,
    setAlertState,
  ]);

  if (
    recruitDetailLoading ||
    userAnswerListLoading ||
    !recruitDetail ||
    !Object.keys(recruitDetail).length ||
    !userAnswerList ||
    !Object.keys(userAnswerList).length
  ) {
    return (
      <ApplicationLoadingNoData
        isLoading={recruitDetailLoading || userAnswerListLoading}
      />
    );
  }

  return (
    <>
      <ApplicationFormHeader
        title={mode === 'VIEW' ? '지원서 확인' : '지원서 수정'}
      />
      <ApplicationForm
        recuitId={recruitId}
        applicationId={applicationId}
        mode={mode}
        data={recruitDetail}
        answerList={userAnswerList?.forms ?? null}
      />
      <ApplicatoinFormFooter mode={mode} setMode={setMode} />
    </>
  );
}

export default MyApplication;
