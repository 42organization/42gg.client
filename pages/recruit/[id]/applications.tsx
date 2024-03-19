import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { applicationAlertState } from 'utils/recoil/application';
import ApplicationForm from 'components/recruit/Application/ApplicationForm';
import ApplicatoinFormFooter from 'components/recruit/Application/ApplicationFormFooter';
import ApplicationFormHeader from 'components/recruit/Application/ApplicationFormHeader';
import ApplicationSnackBar from 'components/recruit/Application/ApplicationSnackBar';

function Application() {
  const setAlertState = useSetRecoilState(applicationAlertState);

  useEffect(() => {
    setAlertState((prev) => ({ ...prev, alertState: false }));
  }, []);

  return (
    <>
      <ApplicationFormHeader />
      <ApplicationForm />
      <ApplicatoinFormFooter />
      <ApplicationSnackBar />
    </>
  );
}

export default Application;
