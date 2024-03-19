import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Button, Modal, Typography } from '@mui/material';
import { IApplicantAnswer } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import {
  applicationAlertState,
  applicationFormTypeState,
  applicationModalState,
  userApplicationAnswerState,
} from 'utils/recoil/application';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

export default function ApplyModal() {
  const setAlertState = useSetRecoilState(applicationAlertState);
  const applicantAnswers = useRecoilValue(userApplicationAnswerState);
  const [modalState, setModalState] = useRecoilState(applicationModalState);
  const applicationMode = useRecoilValue(applicationFormTypeState);

  const router = useRouter();
  const recruitId = parseInt(router.query.id as string);
  const applicationId = parseInt(router.query.applicationId as string);
  console.log(router, applicationId);

  const onModalClose = () => {
    setModalState({ state: false, content: 'NONE' });
  };

  const { mutate } = useMutation(
    (applicantAnswers: IApplicantAnswer[]): Promise<AxiosResponse> => {
      if (applicationMode === 'APPLY') {
        return mockInstance.post(`/recruitments/${recruitId}/applications`, {
          form: applicantAnswers,
        });
      } else {
        return mockInstance.patch(
          `/recruitments/${recruitId}/applications/${applicationId}`,
          { form: applicantAnswers }
        );
      }
    }
  );

  const onApply = () => {
    mutate(applicantAnswers, {
      onSuccess: () => {
        setAlertState({
          alertState: true,
          message:
            applicationMode === 'APPLY' ? '지원되었습니다.' : '수정되었습니다.',
          severity: applicationMode === 'APPLY' ? 'success' : 'info',
        });
        setModalState({ state: false, content: 'NONE' });
        // todo: 제출 후 recruit로 page 이동
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
              onClick={onModalClose}
              color={'secondary'}
            >
              취소
            </Button>
            <Button
              className={styles.applyBtn}
              variant='contained'
              onClick={onApply}
              color={'primary'}
            >
              제출하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
