import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { IApplicantAnswer } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/modal/recruit/ApplyModal.module.scss';

export default function ApplyModal({
  recruitId,
  applicantAnswers,
}: {
  recruitId: number;
  applicantAnswers: IApplicantAnswer[];
}) {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const onCancel = () => {
    setModal({ modalName: null });
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
        setModal({ modalName: null });
        setSnackBar({
          toastName: 'apply',
          severity: 'success',
          message: '지원되었습니다.',
          clicked: true,
        });
      },
      onError: () => {
        setSnackBar({
          toastName: 'apply',
          severity: 'error',
          message: '요청에 문제가 발생했습니다.',
          clicked: true,
        });
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>지원서를 제출할까요?</div>
      <div className={styles.content}>
        제출한 지원서는 제출 마감 전까지 수정하거나 삭제할 수 있습니다.
      </div>
      <div className={styles.btnContainer}>
        <Button
          className={styles.cancelBtn}
          variant='outlined'
          onClick={onCancel}
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
      </div>
    </div>
  );
}
