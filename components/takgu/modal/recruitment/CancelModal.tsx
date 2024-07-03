import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Box, Button, Modal, Typography } from '@mui/material';
import { instance } from 'utils/axios';
import {
  applicationAlertState,
  applicationModalState,
} from 'utils/recoil/application';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

interface ICancelModalProps {
  recruitId: number;
  applicationId: number | null;
}

function CancelModal(props: ICancelModalProps) {
  const { recruitId, applicationId } = props;
  const router = useRouter();
  const modalState = useRecoilValue(applicationModalState);
  const setAlertState = useSetRecoilState(applicationAlertState);
  const resetModalState = useResetRecoilState(applicationModalState);

  const { mutate } = useMutation(
    (applicationId: number | null): Promise<AxiosResponse> => {
      return instance.delete(
        `/recruitments/${recruitId}/applications/${applicationId}`
      );
    }
  );

  const onCancel = () => {
    mutate(applicationId, {
      onSuccess: () => {
        setAlertState({
          alertState: true,
          message: '지원이 취소되었습니다.',
          severity: 'success',
        });
        resetModalState();
        router.push(`/takgu/recruit/detail?recruitId=${recruitId}`);
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
    <Modal onClose={resetModalState} open={modalState.state}>
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
            onClick={() => resetModalState()}
            color={'secondary'}
          >
            돌아가기
          </Button>
          <Button
            className={styles.applyCancelBtn}
            variant='contained'
            onClick={() => onCancel()}
            color={'primary'}
          >
            취소하기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CancelModal;
