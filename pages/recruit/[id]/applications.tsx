import { useRouter } from 'next/router';
import ApplicationForm from 'components/recruit/Application/ApplicationForm';
import ApplicationFormHeader from 'components/recruit/Application/ApplicationFormHeader';
import ApplicationSnackBar from 'components/recruit/Application/ApplicationSnackBar';

function Application() {
  const router = useRouter();
  const recruitId = parseInt(router.query.id as string);
  const applicationId = parseInt(router.query.applicationId as string);

  return (
    <>
      <ApplicationFormHeader />
      <ApplicationForm recruitId={recruitId} applicationId={applicationId} />
      <ApplicationSnackBar />
    </>
  );
}

export default Application;
