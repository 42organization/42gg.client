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
  Button,
  Container,
  Dialog,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { IApplicantAnswer } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/modal/recruit/ApplyModal.module.scss';

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
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const onClose = () => {
    setModalOpen(false);
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
        // setSnackBar({
        //   toastName: 'apply',
        //   severity: 'success',
        //   message: '지원되었습니다.',
        //   clicked: true,
        // });
      },
      onError: () => {
        // setSnackBar({
        //   toastName: 'apply',
        //   severity: 'error',
        //   message: '요청에 문제가 발생했습니다.',
        //   clicked: true,
        // });
      },
    });
  };

  if (!modalOpen || applicantAnswers.length === 0) return;

  return (
    <Dialog onClose={onClose} open={modalOpen} TransitionComponent={Transition}>
      <DialogTitle>지원서를 제출할까요?</DialogTitle>
      <Typography component={'div'}>
        제출한 지원서는 제출 마감 전까지 수정하거나 삭제할 수 있습니다.
      </Typography>
      <Container>
        <Button
          className={styles.cancelBtn}
          variant='outlined'
          onClick={onClose}
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
      </Container>
    </Dialog>
  );
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.title}>지원서를 제출할까요?</div>
  //     <div className={styles.content}>
  //       제출한 지원서는 제출 마감 전까지 수정하거나 삭제할 수 있습니다.
  //     </div>
  //     <div className={styles.btnContainer}>
  //       <Button
  //         className={styles.cancelBtn}
  //         variant='outlined'
  //         onClick={onCancel}
  //       >
  //         취소
  //       </Button>
  //       <Button
  //         className={styles.applyBtn}
  //         variant='contained'
  //         onClick={onApply}
  //       >
  //         제출하기
  //       </Button>
  //     </div>
  //   </div>
  // );
}
