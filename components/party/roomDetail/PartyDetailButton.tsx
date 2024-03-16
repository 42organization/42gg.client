import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { CiShare2 } from 'react-icons/ci';
import { PiSirenFill } from 'react-icons/pi';
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
      console.error(error);
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
    await instance.patch(`/party/rooms/${roomId}`).catch((error) => {
      console.error(error);
    });
    fetchRoomDetail();
  };

  return (
    <button className={styles.leaveBtn} onClick={handlerExit}>
      방 나가기
    </button>
  );
}

function StartRoom() {
  const roomId = useRouter().query.roomId;

  return (
    <button
      className={styles.startBtn}
      onClick={() => {
        instance.patch(`/party/rooms/${roomId}/start`).catch((error) => {
          console.error(error);
        });
      }}
    >
      시작
    </button>
  );
}

// TODO: 버튼에 css입히기

function BackRoomList() {
  const router = useRouter();

  return <button onClick={() => router.push('/party')}></button>;
}

const PartyRoomDetailButton = {
  ReportComment,
  ReportRoom,
  ShareRoom,
  JoinRoom,
  LeaveRoom,
  BackRoomList,
  StartRoom,
};

export default PartyRoomDetailButton;
