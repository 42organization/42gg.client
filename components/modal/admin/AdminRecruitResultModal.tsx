import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { instanceInManage, instance } from 'utils/axios';
import { dateToStringShort , dateToDateTimeLocalString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminRecruitMessageTemplateModal.module.scss';

interface notiMessageType {
  messageId: number;
  messageType: string;
  isUse: boolean;
  message: string;
}

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
  const [passMessage, setPassMessage] = useState<notiMessageType>();
  const [failMessage, setFailMessage] = useState<notiMessageType>();
  const [interviewMessage, setInterviewMessage] = useState<string>();
  const setSnackbar = useSetRecoilState(toastState);
  const sendInterviewResult = async () => {
    try {
      if (!interviewDate) return;
      // send interview result to server
      await instance.post(
        `/admin/recruitments/${recruitId}/interview?application=${applicationId}`,
        {
          status,
          interviewDate: dateToDateTimeLocalString(interviewDate),
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
      await instance.post(
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

  const messagesResult = async () => {
    try {
      const res = await instance.get(`/admin/recruitments/result/message`);
      res.data.messages?.map((message: notiMessageType) => {
        if (message.messageType === 'INTERVIEW' && message.isUse) {
          if (!interviewDate) return;
          const interviewDateMessage = message.message.replace(
            '${선택날짜}',
            dateToStringShort(interviewDate)
          );
          if (!interviewDateMessage) return;
          setInterviewMessage(interviewDateMessage);
        } else if (message.messageType === 'PASS' && message.isUse) {
          setPassMessage(message);
        } else if (message.messageType === 'FAIL' && message.isUse) {
          setFailMessage(message);
        }
      });
    } catch (e: any) {
      setSnackbar({
        toastName: 'get notification',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
    messagesResult();
  }, []);

  if (status === 'PROGRESS_INTERVIEW' && interviewDate) {
    return (
      <div className={styles.container}>
        <div>{interviewMessage}</div>
        <button onClick={sendInterviewResult}>면접 결과 등록</button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {status === 'PASS' ? (
        <div>{passMessage?.message}</div>
      ) : (
        <div>{failMessage?.message}</div>
      )}
      <button onClick={sendFinalResult}>최종 결과 등록</button>
    </div>
  );
}

export default AdminRecruitResultModal;
