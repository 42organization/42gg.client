import { useRouter } from 'next/router';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type ButtonProps = { roomId: number };
type PartyRoomDetailProps = { partyRoomDetail: PartyRoomDetail };

export default function PartyDetail(partyRoomDetail: PartyRoomDetail) {
  //TODO : finish에 댓글은 보여주고 입력만 보여주지 않기.
  return (
    <div>
      <CommonDetail {...partyRoomDetail} />
      {partyRoomDetail.roomStatus !== 'FINISH' && (
        <PartyButtton partyRoomDetail={partyRoomDetail} />
      )}
      <PartyComment partyRoomDetail={partyRoomDetail} />
      {partyRoomDetail.myNickname &&
        partyRoomDetail.roomStatus !== 'FINISH' && (
          <InputBar roomId={partyRoomDetail.roomId} />
        )}
    </div>
  );
}

function CommonDetail(partyRoomDetail: PartyRoomDetail) {
  return (
    <div>
      {/*공유하기 버튼*/}
      <h2>제목 : {partyRoomDetail.title}</h2>
      <h3>카테고리 : {partyRoomDetail.categoryId}</h3>
      <h3>
        날짜 :{' '}
        {/*한국 날짜로 수정 필요 및 남은 시간 표시 */ partyRoomDetail.dueDate}
      </h3>
      <h3>내용 : {partyRoomDetail.content}</h3>
      <h3>
        인원 : {partyRoomDetail.currentPeople + '/' + partyRoomDetail.maxPeople}
      </h3>
      <h3>주최자 : {partyRoomDetail.hostNickname}</h3>
      <h3>참여자 : {/* 호버로 인원 보여주기. */}</h3>
      <h4>방 상황 : {partyRoomDetail.roomStatus}</h4>
    </div>
  );
}

function PartyButtton({ partyRoomDetail }: PartyRoomDetailProps) {
  return (
    <div>
      {partyRoomDetail.hostNickname === partyRoomDetail.myNickname ? (
        partyRoomDetail.minPeople <= partyRoomDetail.currentPeople && (
          <StartButton roomId={partyRoomDetail.roomId} />
        )
      ) : partyRoomDetail.myNickname ? (
        <CancelButton roomId={partyRoomDetail.roomId} />
      ) : (
        <JoinButton roomId={partyRoomDetail.roomId} />
      )}
    </div>
  );
}

function PartyComment({ partyRoomDetail }: PartyRoomDetailProps) {
  return (
    <div>
      <h3>댓글</h3>
      {/*총 댓글 수랑, 댓글 달린 시간, 신고버튼*/}
      {partyRoomDetail.comments.map((comment) =>
        comment.isHidden ? (
          `숨김 처리된 댓글입니다.`
        ) : (
          <div key={comment.commentId}>
            <h4>{comment.nickname}</h4>
            <h4>{comment.content}</h4>
          </div>
        )
      )}
    </div>
  );
}

function StartButton({ roomId }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        mockInstance.post(`/party/rooms/${roomId}/start`).then(() => {
          router.push(`/parties/${roomId}`);
        });
      }}
    >
      시작
    </button>
  );
}

function CancelButton({ roomId }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        mockInstance.patch(`/party/rooms/${roomId}`).then(() => {
          router.push(`/parties/${roomId}`);
        });
      }}
    >
      취소하기
    </button>
  );
}

function JoinButton({ roomId }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        mockInstance.post(`/party/rooms/${roomId}/join`).then(() => {
          router.push(`/parties/${roomId}`);
        });
      }}
    >
      참여하기
    </button>
  );
}

function InputBar({ roomId }: ButtonProps) {
  const router = useRouter();
  return (
    <form
      onSubmit={async () => {
        mockInstance.post(`/party/rooms/${roomId}/comments`).then(() => {
          router.push(`/parties/${roomId}`);
        });
      }}
    >
      <input type='text' />
      <button type='submit'>댓글</button>
    </form>
  );
}

export function Hidden() {
  return <div>해당 방이 존재하지 않습니다.</div>;
}
