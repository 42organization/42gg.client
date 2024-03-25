import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { CiShare2 } from 'react-icons/ci';
import { PiSirenFill } from 'react-icons/pi';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/party/PartyDetailRoom.module.scss';

type ParytButtonProps = {
  roomId?: number;
  commentId?: number;
};

function ReportComment({ commentId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
      className={styles.commentBtn}
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
      <PiSirenFill color='red' />
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
      <PiSirenFill color='red' />
    </button>
  );
}

function ShareRoom() {
  const roomId = useRouter().query.roomId;

  return (
    <button
      className={styles.shareBtn}
      onClick={() => {
        navigator.clipboard.writeText(`http://42gg.kr/parties/${roomId}`);
      }}
    >
      <CiShare2 />
    </button>
  );
}

type RefreshProps = ParytButtonProps & {
  fetchRoomDetail: () => void;
};

function JoinRoom({ roomId, fetchRoomDetail }: RefreshProps) {
  const setSnackbar = useSetRecoilState(toastState);
  const handlerJoin = () => {
    instance
      .post(`/party/rooms/${roomId}`)
      .then(() => {
        fetchRoomDetail();
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

  return (
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
      방 나가기
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
          .patch(`/party/rooms/${roomId}/start`)
          .then(() => {
            fetchRoomDetail();
          })
          .catch(() => {
            setSnackbar({
              toastName: 'patch request',
              message: '시작에 실패했습니다시',
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
};

export default PartyRoomDetailButton;