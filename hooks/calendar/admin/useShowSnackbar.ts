import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { AlertColor } from '@mui/material';
import { toastState } from 'utils/recoil/toast';

export const useShowSnackbar = () => {
  const setSnackbar = useSetRecoilState(toastState);

  return useCallback(
    (status: AlertColor, url: string) => {
      setSnackbar({
        toastName: `post request`,
        severity: status,
        message: `🔥${status} : ${url}🔥`,
        clicked: true,
      });
    },
    [setSnackbar]
  );
};
