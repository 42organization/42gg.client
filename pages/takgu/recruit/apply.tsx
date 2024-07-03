import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { applicationAlertState } from 'utils/recoil/application';
import ApplicationForm from 'components/takgu/recruit/Application/ApplicationForm';
import ApplicationLoadingNoData from 'components/takgu/recruit/Application/ApplicationLoadingNoData';
import StickyHeader from 'components/takgu/recruit/StickyHeader';
import useRecruitDetail from 'hooks/takgu/recruit/useRecruitDetail';

function Apply() {
  const router = useRouter();
  const recruitId = parseInt(router.query.recruitId as string);
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
      <StickyHeader headerTitle={'지원서 작성'} />
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
