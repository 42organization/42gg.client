import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, Button, Modal, Typography } from '@mui/material';
import { mockInstance } from 'utils/mockAxios';
import {
  applicationAlertState,
  applicationModalState,
} from 'utils/recoil/application';
import { sleep } from 'utils/sleep';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

interface IapplicationInfo {
  recruitId: number;
  applicationId?: number;
}

export default function CancelModal() {
  const setAlertState = useSetRecoilState(applicationAlertState);
  const [modalState, setModalState] = useRecoilState(applicationModalState);

  const router = useRouter();
  const recruitId = parseInt(router.query.id as string);
  const applicationId = parseInt(router.query.applicationId as string);

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
    mutate(
      { recruitId, applicationId },
      {
        onSuccess: async () => {
          setAlertState({
            alertState: true,
            message: '지원이 취소되었습니다.',
            severity: 'success',
          });
          setModalState({ state: false, content: 'NONE' });
          await sleep(3000);
          router.push(`/recruit/${recruitId}`);
        },
        onError: () => {
          setAlertState({
            alertState: true,
            message: '요청에 문제가 발생했습니다.',
            severity: 'error',
          });
        },
      }
    );
  };

  return (
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
  );
}
