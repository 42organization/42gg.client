import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ApplicationFormType } from 'types/takgu/recruit/recruitments';
import { applicationAlertState } from 'utils/takgu/recoil/application';
import ApplicationForm from 'components/takgu/recruit/Application/ApplicationForm';
import ApplicatoinFormFooter from 'components/takgu/recruit/Application/applicationLayout/ApplicationFormFooter';
import ApplicationLoadingNoData from 'components/takgu/recruit/Application/ApplicationLoadingNoData';
import StickyHeader from 'components/takgu/recruit/StickyHeader';
import useRecruitDetail from 'hooks/takgu/recruit/useRecruitDetail';
import useRecruitDetailUser from 'hooks/takgu/recruit/useRecruitDetailUser';

function MyApplication() {
  const router = useRouter();
  const recruitId = parseInt(router.query.recruitId as string);
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
      <StickyHeader
        headerTitle={mode === 'VIEW' ? '지원서 확인' : '지원서 수정'}
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
