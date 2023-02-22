import { forwardRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars() {
  const [{ severity, message, clicked }, setSnackBar] =
    useRecoilState(toastState);
  useEffect(() => {
    if (clicked) setSnackBar({ toastName: null });
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway' || reason === 'escapeKeyDown') return;
    setSnackBar({ toastName: null });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={clicked ?? false}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
