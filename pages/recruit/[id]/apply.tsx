import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { applicationAlertState } from 'utils/recoil/application';
import ApplicationForm from 'components/recruit/Application/ApplicationForm';
import ApplicationFormHeader from 'components/recruit/Application/applicationLayout/ApplicationFormHeader';
import ApplicationLoadingNoData from 'components/recruit/Application/ApplicationLoadingNoData';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';

function Apply() {
  const router = useRouter();
  const recruitId = parseInt(router.query.id as string);
  const setAlertState = useSetRecoilState(applicationAlertState);

  const { data, isLoading } = useRecruitDetail(recruitId);

  useEffect(() => {
    if (!isLoading && (!data || !Object.keys(data).length)) {
      setAlertState({
        alertState: true,
        message: '올바르지 않은 요청입니다.',
        severity: 'error',
      });
      return;
    }
  }, [isLoading, data, setAlertState]);

  if (isLoading || !data || Object.keys(data).length === 0) {
    return <ApplicationLoadingNoData isLoading={isLoading} />;
  }

  return (
    <>
      <ApplicationFormHeader title={'지원서 작성'} />
      <ApplicationForm
        recuitId={recruitId}
        applicationId={null}
        mode={'APPLY'}
        data={data}
        answerList={null}
      />
    </>
  );
}

export default Apply;
