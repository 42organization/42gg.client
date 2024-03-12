import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';

type ParytButtonProps = {
  roomId?: number;
  commentId?: number;
};

function ReportComment({ commentId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
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
      신고
    </button>
  );
}

function ReportRoom({ roomId }: ParytButtonProps) {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
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
      방 신고
    </button>
  );
}

function ShareRoom() {
  const roomId = useRouter().query.roomId;

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(`http://42gg.kr/parties/${roomId}`);
      }}
    >
      공유하기
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

  return <button onClick={handlerJoin}>참여하기</button>;
}

function LeaveRoom({ roomId, fetchRoomDetail }: ReprashProps) {
  const handlerExit = async () => {
    await instance.patch(`/party/rooms/${roomId}`).catch((error) => {
      console.error(error);
    });
    fetchRoomDetail();
  };

  return <button onClick={handlerExit}>방 나가기</button>;
}

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
};

export default PartyRoomDetailButton;
