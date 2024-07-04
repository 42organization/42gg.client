import { AxiosError } from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Modal, PartyReportModalData } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/takgu/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/takgu/modal/menu/ReportModal.module.scss';
import { ModalButton, ModalButtonContainer } from '../ModalButton';

export function PartyReportModal({ report }: { report: PartyReportModalData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const setModal = useSetRecoilState<Modal>(modalState);
  const setSnackbar = useSetRecoilState(toastState);

  const reportHandler = async () => {
    const reportResponse: { [key: string]: string } = {
      SUCCESS: '신고해주셔서 감사합니다 ❤️',
      REJECT: '내용을 적어주세요 ❤️',
    };

    if (!content.replace(/^\s+|\s+$/g, '')) {
      alert('칸을 입력하지 않았습니다.');
      throw new Error('REJECT');
    }

    try {
      switch (report.name) {
        case 'COMMENT':
          await instance.post(`/party/reports/comments/${report.commentId}`, {
            content: content,
          });
          break;
        case 'ROOM':
          await instance.post(`/party/reports/rooms/${report.roomId}`, {
            content: content,
          });
          break;
        case 'NOSHOW':
          await instance.post(
            `/party/reports/rooms/${report.roomId}/users/${report.userIntraId}`,
            { content: content }
          );
          break;
      }
      setModal({ modalName: null });
      setSnackbar({
        toastName: `report request`,
        severity: 'success',
        message: `${reportResponse.SUCCESS}`,
        clicked: true,
      });
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        setSnackbar({
          toastName: `bad request`,
          severity: 'error',
          message: `🔥 ${message} 🔥`,
          clicked: true,
        });
      }
      throw new Error('REJECT');
    }
  };

  const handleReport = () => {
    setIsLoading(true);
    reportHandler().catch(() => setIsLoading(false));
  };

  const reportName =
    report.name === 'NOSHOW'
      ? `${report.userIntraId} 노쇼 신고`
      : report.name === 'COMMENT'
      ? '댓글 신고'
      : '방 신고';

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>42GG</div>
        <div className={styles.phrase}>{reportName}</div>
      </div>
      <form>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <textarea
              name='content'
              maxLength={300}
              onChange={(e) => setContent(e.target.value)}
            />
            <div>{`${content.length}/300`}</div>
          </div>
        </div>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => setModal({ modalName: null })}
            style='negative'
            value='취소'
          />
          <ModalButton
            onClick={handleReport}
            style='positive'
            value='보내기'
            isLoading={isLoading}
          />
        </ModalButtonContainer>
      </form>
    </div>
  );
}
