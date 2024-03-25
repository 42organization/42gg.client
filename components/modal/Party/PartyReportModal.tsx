import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Modal, PartyReportModalData } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/menu/ReportModal.module.scss';
import { ModalButton, ModalButtonContainer } from '../ModalButton';

export function PartyReportModal({ report }: { report: PartyReportModalData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const setModal = useSetRecoilState<Modal>(modalState);

  const reportHandler = async () => {
    const reportResponse: { [key: string]: string } = {
      SUCCESS: '신고해주셔서 감사합니다 ❤️',
      REJECT: '내용을 적어주세요 ❤️',
    };

    try {
      if (!content.replace(/^\s+|\s+$/g, '')) {
        throw new Error('칸을 입력하지 않았습니다.');
      }
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
      alert(reportResponse.SUCCESS);
    } catch (e) {
      alert('신고에 실패했습니다.');
      throw new Error('REJECT');
    }
  };

  const handleReport = () => {
    setIsLoading(true);
    reportHandler().catch(() => setIsLoading(false));
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>42GG</div>
        <div className={styles.phrase}>{report.name}</div>
      </div>
      <form>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <textarea
              name='content'
              maxLength={300}
              onChange={(e) => setContent(content + e)}
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
