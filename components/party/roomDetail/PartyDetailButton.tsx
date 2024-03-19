import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { CiShare2 } from 'react-icons/ci';
import { PiSirenFill } from 'react-icons/pi';
import { Snackbar } from '@mui/material';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
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

type ReprashProps = ParytButtonProps & {
  fetchRoomDetail: () => void;
};

function JoinRoom({ roomId, fetchRoomDetail }: ReprashProps) {
  const handlerJoin = async () => {
    await instance.post(`/party/rooms/${roomId}/join`).catch((error) => {
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message='참여에 실패했습니다.'
      />;
    });
    fetchRoomDetail();
  };

  return (
    <button className={styles.joinBtn} onClick={handlerJoin}>
      참여하기
    </button>
  );
}

function LeaveRoom({ roomId, fetchRoomDetail }: ReprashProps) {
  const handlerExit = async () => {
    await instance.patch(`/party/rooms/${roomId}`).catch(() => {
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message='나가기에 실패했습니다. 다시 시도해주세요.'
      />;
    });
    fetchRoomDetail();
  };

  return (
    <button className={styles.leaveBtn} onClick={handlerExit}>
      방 나가기
    </button>
  );
}

function StartRoom({ roomId }: { roomId: number }) {
  return (
    <button
      className={styles.startBtn}
      onClick={() => {
        instance.patch(`/party/rooms/${roomId}/start`).catch(() => {
          <Snackbar
            open={true}
            autoHideDuration={6000}
            message='시작하지 못했습니다. 다시 시도해주세요.'
          />;
        });
      }}
    >
      시작
    </button>
  );
}

// TODO: 버튼에 css입히기

const PartyRoomDetailButton = {
  ReportComment,
  ReportRoom,
  ShareRoom,
  JoinRoom,
  LeaveRoom,
  StartRoom,
};

export default PartyRoomDetailButton;
