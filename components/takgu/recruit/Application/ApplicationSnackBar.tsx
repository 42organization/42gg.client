import { useRecoilState } from 'recoil';
import { Alert, Snackbar } from '@mui/material';
import { applicationAlertState } from 'utils/recoil/application';

export default function ApplicationSnackBar() {
  const [alertState, setAlertState] = useRecoilState(applicationAlertState);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={alertState.alertState}
      autoHideDuration={5000}
      onClose={() => setAlertState((prev) => ({ ...prev, alertState: false }))}
    >
      <Alert
        onClose={() =>
          setAlertState((prev) => ({ ...prev, alertState: false }))
        }
        severity={alertState.severity}
        variant='filled'
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}
