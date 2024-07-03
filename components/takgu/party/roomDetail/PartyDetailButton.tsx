import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { BsShare } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import usePartyPenaltyTimer from 'hooks/party/usePartyPenaltyTimer';
import styles from 'styles/party/PartyDetailRoom.module.scss';

type ParytButtonProps = {
  roomId?: number;
  commentId?: number;
  userIntraId?: string;
};

function ReportComment({ commentId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
      className={styles.reportCommentBtn}
      onClick={() => {
        setModal({
          partyReport: {
            name: 'COMMENT',
            commentId: commentId,
          },
          modalName: 'PARTY-REPORT',
        });
      }}
    >
      <FiAlertTriangle color='gray' />
    </button>
  );
}

function ReportRoom({ roomId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
      className={styles.reportRoomBtn}
      onClick={() => {
        setModal({
          partyReport: {
            name: 'ROOM',
            roomId: roomId,
          },
          modalName: 'PARTY-REPORT',
        });
      }}
    >
      <FiAlertTriangle color='gray' />
    </button>
  );
}

function ReportNoShow({ roomId, userIntraId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
      className={styles.noShowBtn}
      onClick={() => {
        setModal({
          partyReport: {
            name: 'NOSHOW',
            roomId: roomId,
            userIntraId: userIntraId,
          },
          modalName: 'PARTY-REPORT',
        });
      }}
    >
      <div style={{ margin: '0 0.3rem' }}>노쇼 신고</div>
      <FiAlertTriangle color='gray' style={{ marginTop: 'auto' }} />
    </button>
  );
}

function ShareRoom() {
  const setSnackbar = useSetRecoilState(toastState);
  const shareUrl = `${
    process.env.NEXT_PUBLIC_CLIENT_ENDPOINT + useRouter().asPath
  }`;

  return (
    <button
      className={styles.shareBtn}
      onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        setSnackbar({
          toastName: 'clip board',
          message: '주소가 복사되었습니다.',
          severity: 'success',
          clicked: true,
        });
      }}
    >
      <BsShare size={20} />
    </button>
  );
}

type RefreshProps = ParytButtonProps & {
  fetchRoomDetail: () => void;
};

function JoinRoom({ roomId, fetchRoomDetail }: RefreshProps) {
  const setSnackbar = useSetRecoilState(toastState);
  const { penaltyPeroid } = usePartyPenaltyTimer();

  const handlerJoin = () => {
    instance
      .post(`/party/rooms/${roomId}`)
      .then(() => {
        fetchRoomDetail();
        setSnackbar({
          toastName: 'Party Join',
          message:
            '파티모집이 완료되면 slack 메세지가 보내집니다. slack 알림을 켜주세요!',
          severity: 'success',
          clicked: true,
        });
      })
      .catch(() => {
        setSnackbar({
          toastName: 'GET request',
          message: '참여에 실패했습니다. 다시 시도해주세요.',
          severity: 'error',
          clicked: true,
        });
      });
  };

  return penaltyPeroid ? (
    <button
      className={`${styles.joinBtn} ${styles.penalty}`}
      onClick={handlerJoin}
    >
      패널티 부여 중<br />
      {penaltyPeroid}
    </button>
  ) : (
    <button className={styles.joinBtn} onClick={handlerJoin}>
      참여하기
    </button>
  );
}

function LeaveRoom({ roomId, fetchRoomDetail }: RefreshProps) {
  const setSnackbar = useSetRecoilState(toastState);

  const handlerExit = () => {
    instance
      .patch(`/party/rooms/${roomId}`)
      .then(() => {
        fetchRoomDetail();
      })
      .catch(() => {
        setSnackbar({
          toastName: 'patch request',
          message: '나가기에 실패했습니다.\n 다시 시도해주세요.',
          severity: 'error',
          clicked: true,
        });
      });
  };

  return (
    <button className={styles.leaveBtn} onClick={handlerExit}>
      파티 탈퇴
    </button>
  );
}

function StartRoom({ roomId, fetchRoomDetail }: RefreshProps) {
  const setSnackbar = useSetRecoilState(toastState);

  return (
    <button
      className={styles.startBtn}
      onClick={() => {
        instance
          .post(`/party/rooms/${roomId}/start`)
          .then(() => {
            setSnackbar({
              toastName: 'room start',
              message: '슬랙으로 시작 알림이 전송되었습니다.',
              severity: 'success',
              clicked: true,
            });
            fetchRoomDetail();
          })
          .catch(() => {
            setSnackbar({
              toastName: 'patch request',
              message: '시작에 실패했습니다.\n 다시 시도해주세요.',
              severity: 'error',
              clicked: true,
            });
          });
      }}
    >
      시작
    </button>
  );
}

const PartyRoomDetailButton = {
  ReportComment,
  ReportRoom,
  ShareRoom,
  JoinRoom,
  LeaveRoom,
  StartRoom,
  ReportNoShow,
};

export default PartyRoomDetailButton;
