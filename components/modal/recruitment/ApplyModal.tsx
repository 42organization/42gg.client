import { AxiosResponse } from 'axios';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  forwardRef,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import {
  Alert,
  Box,
  Button,
  Dialog,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { IApplicantAnswer } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/modal/recruit/ApplyModal.module.scss';

interface ISnackBarState extends SnackbarOrigin {
  snackBarOpen: boolean;
  message: string;
  severity: 'success' | 'error';
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ApplyModal({
  modalOpen,
  setModalOpen,
  recruitId,
  applicantAnswers,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  recruitId: number;
  applicantAnswers: IApplicantAnswer[];
}) {
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    snackBarOpen: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    severity: 'error',
  });

  const { snackBarOpen, vertical, horizontal, message, severity } =
    snackBarState;

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onSanckBarClose = () => {
    setSnackBarState({ ...snackBarState, snackBarOpen: false });
  };

  const { mutate } = useMutation(
    (applicantAnswers: IApplicantAnswer[]): Promise<AxiosResponse> => {
      return mockInstance.post(
        `/recruitments/${recruitId}/applications`,
        applicantAnswers
      );
    }
  );

  const onApply = () => {
    mutate(applicantAnswers, {
      onSuccess: () => {
        setSnackBarState((prev) => ({
          ...prev,
          snackBarOpen: true,
          message: '지원되었습니다.',
          severity: 'success',
        }));
      },
      onError: () => {
        setSnackBarState((prev) => ({
          ...prev,
          snackBarOpen: true,
          message: '요청에 문제가 발생했습니다.',
          severity: 'error',
        }));
      },
    });
  };

  if (!modalOpen || applicantAnswers.length === 0) return <></>;

  return (
    <>
      <Dialog
        onClose={onModalClose}
        open={modalOpen}
        TransitionComponent={Transition}
        sx={{ borderRadius: '3rem' }}
      >
        <Box className={styles.container}>
          <div className={styles.title}>지원서를 제출할까요?</div>
          <div className={styles.content}>
            제출한 지원서는 제출 마감 전까지 수정하거나 삭제할 수 있습니다.
          </div>
          <Box className={styles.btnContainer}>
            <Button
              className={styles.cancelBtn}
              variant='outlined'
              onClick={onModalClose}
            >
              취소
            </Button>
            <Button
              className={styles.applyBtn}
              variant='contained'
              onClick={onApply}
            >
              제출하기
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{ vertical, horizontal }}
        onClose={onSanckBarClose}
        autoHideDuration={6000}
      >
        <Alert onClose={onSanckBarClose} severity={severity} variant={'filled'}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
