import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';
import { AgendaStatus } from 'constants/agenda/agenda';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import { useModal } from 'components/agenda/modal/useModal';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import { useUser } from 'hooks/takgu/Layout/useUser';
import styles from 'styles/agenda/pages/agendakey/host/host.module.scss';

const ModifyAgenda = () => {
  const router = useRouter();
  const agendaKey = useAgendaKey();
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
    router.push(
      `/agenda/detail/host/createAnnouncement?agenda_key=${agendaKey}`
    );
  };

  const confirmAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.OPEN) {
      handleClick('행사를 확정하시겠습니까?', () => {
        sendRequest('PATCH', `confirm`, {}, { agenda_key: agendaKey });
        router.push(`/agenda/detail?agenda_key=${agendaKey}`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사 모집 중 상태에서만 확정이 가능합니다. 🔥`,
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
        message: `🔥 행사 모집 중 상태에서만 취소가 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  const resultAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.CONFIRM) {
      handleClick('행사를 상 입력 없이 종료하시겠습니까?', () => {
        sendRequest('PATCH', 'finish', {}, { agenda_key: agendaKey });
        router.push(`/agenda/detail?agenda_key=${agendaKey}`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사가 진행 중인 상태에서만 종료가 가능합니다. 🔥`,
        clicked: true,
      });
    }
  };

  const resultFormAgenda = () => {
    if (agendaStatus && agendaStatus === AgendaStatus.CONFIRM) {
      handleClick('행사 종료 후 상 입력을 하시겠습니까?', () => {
        router.push(`/agenda/detail/host/result?agenda_key=${agendaKey}`);
      });
    } else {
      setSnackbar({
        toastName: `status error`,
        severity: 'error',
        message: `🔥 행사가 진행 중인 상태에서만 종료가 가능합니다. 🔥`,
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

  if (!agendaKey) {
    return <AgendaLoading />;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.warp}>
          <div className={styles.contentWarp}>
            <div className={styles.title}>공지사항 관리</div>
            <div className={styles.description}>
              공지사항 등록시 참가자들에게 slack 알림이 갑니다.
            </div>
            <div className={styles.buttonWarp}>
              <UploadBtn text='공지사항 추가하기' onClick={newAnnouncement} />
            </div>
          </div>
          <div className={styles.contentWarp}>
            <div className={styles.title}>행사 확정</div>
            <div className={styles.description}>
              조건을 만족하고, 팀이 모두 확정되었을 때 행사를 확정할 수
              있습니다.
              <br />
            </div>
            <div className={styles.buttonWarp}>
              <UploadBtn text='참가인원 및 진행 확정' onClick={confirmAgenda} />
            </div>
          </div>
          <div className={styles.contentWarp}>
            <div className={styles.title}>행사 취소</div>
            <div className={styles.description}>
              행사가 모집 중인 상태에서만 행사를 취소할 수 있습니다.
            </div>
            <div className={styles.buttonWarp}>
              <UploadBtn text='행사 취소하기' onClick={cancelAgenda} />
            </div>
          </div>
          <div className={styles.contentWarp}>
            <div className={styles.title}>행사 종료</div>
            <div className={styles.description}>
              행사가 진행 중인 상태에서만 행사를 종료할 수 있습니다.
            </div>
            <div className={styles.buttonWarp}>
              <UploadBtn text='행사 종료하기' onClick={resultAgenda} />
              <UploadBtn
                text='상 입력 후 종료하기'
                onClick={resultFormAgenda}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyAgenda;
