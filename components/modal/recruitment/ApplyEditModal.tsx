import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Box, Button, Modal, Typography } from '@mui/material';
import { ApplicationFormType } from 'types/recruit/recruitments';
import {
  applicationAlertState,
  applicationModalState,
} from 'utils/recoil/application';
import useUserApplicationForm from 'hooks/recruit/useUserApplicationForm';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

interface IApplyEditModalProps {
  recruitId: number;
  applicationId: number | null;
  mode: ApplicationFormType;
}

function ApplyEditModal(props: IApplyEditModalProps) {
  const { recruitId, applicationId, mode } = props;
  const router = useRouter();
  const modalState = useRecoilValue(applicationModalState);
  const resetModalState = useResetRecoilState(applicationModalState);
  const setAlertState = useSetRecoilState(applicationAlertState);
  const { mutate } = useUserApplicationForm(recruitId, applicationId, mode);

  const onApplyEdit = () => {
    if (modalState.formData === null) {
      setAlertState({
        alertState: true,
        message: '요청에 문제가 발생했습니다.',
        severity: 'error',
      });
      return;
    }
    mutate(modalState.formData, {
      onSuccess: () => {
        setAlertState({
          alertState: true,
          message: mode === 'APPLY' ? '지원되었습니다.' : '수정되었습니다.',
          severity: mode === 'APPLY' ? 'success' : 'info',
        });
        resetModalState();
        router.push(`/recruit/${recruitId}`);
      },
      onError: () =>
        setAlertState({
          alertState: true,
          message: '요청에 문제가 발생했습니다.',
          severity: 'error',
        }),
    });
  };

  return (
    <Modal onClose={resetModalState} open={modalState.state}>
      <Box className={styles.container}>
        <Typography align='center' variant='h5'>
          지원서를 제출할까요?
        </Typography>
        <Box className={styles.content}>
          <Typography>
            제출한 지원서는 제출 마감 전까지<br></br>수정하거나 삭제할 수
            있습니다.
          </Typography>
        </Box>
        <Box className={styles.btnContainer}>
          <Button
            className={styles.cancelBtn}
            variant='outlined'
            onClick={() => resetModalState()}
            color={'secondary'}
          >
            취소
          </Button>
          <Button
            className={styles.applyBtn}
            variant='contained'
            color={'primary'}
            onClick={() => onApplyEdit()}
          >
            제출하기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ApplyEditModal;
