import { useSetRecoilState } from 'recoil';
import { instanceInManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminRecruitMessageTemplateModal.module.scss';

function AdminRecruitResultModal({
  recruitId,
  applicationId,
  status,
  interviewDate,
}: {
  recruitId: number;
  applicationId: number;
  status: 'PROGRESS_INTERVIEW' | 'FAIL' | 'PASS';
  interviewDate: Date | null;
}) {
  const setSnackbar = useSetRecoilState(toastState);
  const sendInterviewResult = async () => {
    try {
      // send interview result to server
      await instanceInManage.post(
        `/admin/recruitments/${recruitId}/interview?application=${applicationId}`,
        {
          status,
          interviewDate,
        }
      );
      setSnackbar({
        toastName: 'interviewResult',
        severity: 'success',
        message: '면접 결과가 성공적으로 등록되었습니다.',
        clicked: true,
      });
    } catch (e) {
      setSnackbar({
        toastName: 'interviewResult',
        severity: 'error',
        message: '면접 결과 등록에 실패했습니다.',
        clicked: true,
      });
    }
  };

  const sendFinalResult = async () => {
    try {
      // send final result to server
      await instanceInManage.post(
        `/admin/recruitments/${recruitId}/result?application=${applicationId}`,
        {
          status,
        }
      );
      setSnackbar({
        toastName: 'finalResult',
        severity: 'success',
        message: '최종 결과가 성공적으로 등록되었습니다.',
        clicked: true,
      });
    } catch (e) {
      setSnackbar({
        toastName: 'finalResult',
        severity: 'error',
        message: '최종 결과 등록에 실패했습니다.',
        clicked: true,
      });
    }
  };
  if (status === 'PROGRESS_INTERVIEW' && interviewDate) {
    return (
      <div className={styles.container}>
        <button onClick={sendInterviewResult}>면접 결과 등록</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={sendFinalResult}>최종 결과 등록</button>
    </div>
  );
}

export default AdminRecruitResultModal;
