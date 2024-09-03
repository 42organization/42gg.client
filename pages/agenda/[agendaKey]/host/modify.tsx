import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import { useModal } from 'components/agenda/modal/useModal';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import { useUser } from 'hooks/takgu/Layout/useUser';
import styles from 'styles/agenda/pages/agendakey/host/modify.module.scss';

const ModifyAgenda = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const agendaData = useAgendaInfo(agendaKey as string);
  const user = useUser();
  const { sendRequest } = useFetchRequest();
  const { openModal } = useModal();

  const handleClick = (description: string, onProceed: () => void) => {
    openModal({
      type: 'proceedCheck',
      description: description,
      onProceed: onProceed,
    });
  };

  const newAnnouncement = () => {
    router.push(`/agenda/${agendaKey}/host/createAnnouncement`);
  };

  const confirmAgenda = () => {
    handleClick('아젠다를 확정지으시겠습니까?', () => {
      sendRequest('PATCH', `confirm`, {}, { agenda_key: agendaKey });
    });
  };

  const cancelAgenda = () => {
    handleClick('아젠다를 취소하시겠습니까?', () => {
      sendRequest('PATCH', `cancel`, {}, { agenda_key: agendaKey });
    });
  };

  const resultAgenda = () => {
    router.push(`/agenda/${agendaKey}/host/result`);
  };

  useEffect(() => {
    // 주최자 확인
    if (agendaData && user) {
      if (agendaData.agendaHost !== user.intraId) {
        alert('주최자만 접근 가능한 페이지입니다.');
        router.back();
      }
    }
  }, [agendaData, user, router]);

  return (
    <>
      <div className={styles.container}>
        <UploadBtn text='공지사항 추가' onClick={newAnnouncement} />
        <UploadBtn text='아젠다 확정' onClick={confirmAgenda} />
        <UploadBtn text='아젠다 취소' onClick={cancelAgenda} />
        <UploadBtn text='아젠다 결과 작성' onClick={resultAgenda} />
      </div>
    </>
  );
};

export default ModifyAgenda;
