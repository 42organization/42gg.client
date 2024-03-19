import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { mockInstance } from 'utils/mockAxios';
import {
  IapplicationInfo,
  applicationAlertState,
  applicationModalState,
  userApplicationInfo,
} from 'utils/recoil/application';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

export default function CancelModal() {
  const setAlertState = useSetRecoilState(applicationAlertState);
  const [modalState, setModalState] = useRecoilState(applicationModalState);
  const applicationInfo = useRecoilValue<IapplicationInfo>(userApplicationInfo);

  const onModalClose = () => {
    setModalState({ state: false, content: 'NONE' });
  };

  const { mutate } = useMutation(
    (applicationInfo: IapplicationInfo): Promise<AxiosResponse> => {
      return mockInstance.delete(
        `/recruitments/${applicationInfo.recruitId}/applications/${applicationInfo.applicationId}`
      );
    }
  );

  const onCancel = () => {
    mutate(applicationInfo, {
      onSuccess: () => {
        setAlertState({
          alertState: true,
          message: '지원이 취소되었습니다.',
          severity: 'success',
        });
        setModalState({ state: false, content: 'NONE' });
      },
      onError: () => {
        setAlertState({
          alertState: true,
          message: '요청에 문제가 발생했습니다.',
          severity: 'error',
        });
      },
    });
  };

  return (
    <>
      <Modal onClose={onModalClose} open={modalState.state}>
        <Box className={styles.container}>
          <Typography align='center' variant='h5'>
            지원을 취소할까요?
          </Typography>
          <Box className={styles.content}>
            <Typography>
              지원을 취소한 이후에는 <br></br>
              다시 지원할 수 없습니다.
            </Typography>
          </Box>
          <Box className={styles.btnContainer}>
            <Button
              className={styles.cancelBtn}
              variant='outlined'
              onClick={onModalClose}
              color={'secondary'}
            >
              돌아가기
            </Button>
            <Button
              className={styles.applyCancelBtn}
              variant='contained'
              onClick={onCancel}
              color={'primary'}
            >
              취소하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
