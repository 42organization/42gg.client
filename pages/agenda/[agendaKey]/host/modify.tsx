import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';
import { AgendaStatus } from 'constants/agenda/agenda';
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
  const agendaStatus = agendaData?.agendaStatus;
  const setSnackbar = useSetRecoilState(toastState);

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
    if (agendaStatus && agendaStatus === AgendaStatus.OPEN) {
      handleClick('행사를 확정하시겠습니까?', () => {
        sendRequest('PATCH', `confirm`, {}, { agenda_key: agendaKey });
        router.push(`/agenda/${agendaKey}`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사 모집중 상태에서만 확정이 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  const cancelAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.OPEN) {
      handleClick('행사를 취소하시겠습니까?', () => {
        sendRequest('PATCH', `cancel`, {}, { agenda_key: agendaKey });
        router.push(`/agenda`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사 모집중 상태에서만 취소가 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  const resultAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.CONFIRM) {
      handleClick('행사를 상 입력 없이 종료하시겠습니까?', () => {
        sendRequest('PATCH', 'finish', {}, { agenda_key: agendaKey });
        router.push(`/agenda/${agendaKey}`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사가 진행중인 상태에서만 종료가 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  const resultFormAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.CONFIRM) {
      handleClick('행사 종료 후 상 입력을 하시겠습니까?', () => {
        router.push(`/agenda/${agendaKey}/host/result`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사가 진행중인 상태에서만 종료가 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
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
        <UploadBtn text='공지사항 추가하기' onClick={newAnnouncement} />
        <UploadBtn text='참가인원 및 진행 확정' onClick={confirmAgenda} />
        <UploadBtn text='행사 취소하기' onClick={cancelAgenda} />

        <UploadBtn text='행사 종료하기' onClick={resultAgenda} />
        <UploadBtn text='상 입력 후 종료하기' onClick={resultFormAgenda} />
      </div>
    </>
  );
};
export default ModifyAgenda;
