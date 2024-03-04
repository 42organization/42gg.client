import { useRouter } from 'next/router';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

export default function PartyDetail(partyRoomDetail: PartyRoomDetail) {
  const isInsideRoom = partyRoomDetail.roomUsers.some(
    (user) => user.nickname === partyRoomDetail.myNickname
  ); // TODO : 유저 닉네임이 없으면 내가 방 안에 없는 사람임.
  //TODO : finish에 댓글은 보여주고 입력만 보여주지 않기.
  return (
    <div>
      <CommonDetail {...partyRoomDetail} />
      {partyRoomDetail.roomStatus !== 'FINISH' && (
        <>
          <PartyButtton
            partyRoomDetail={partyRoomDetail}
            isInsideRoom={isInsideRoom}
          />
          <PartyComment
            partyRoomDetail={partyRoomDetail}
            isInsideRoom={isInsideRoom}
          />
        </>
      )}
    </div>
  );
}

function CommonDetail(partyRoomDetail: PartyRoomDetail) {
  return (
    <div>
      <h2>카테고리 : {partyRoomDetail.categoryId}</h2>
      <h1>제목 : {partyRoomDetail.title}</h1>
      <h3>내용 : {partyRoomDetail.content}</h3>
      <h2>참여자 수: {partyRoomDetail.currentPeople}</h2>
      <h2>최소인원 : {partyRoomDetail.minPeople}</h2>
      <h2>최대인원 : {partyRoomDetail.maxPeople}</h2>
      <h2>날짜 : {/*한국 날짜로 수정 필요*/ partyRoomDetail.dueDate}</h2>
      <h4>방 상황 : {partyRoomDetail.roomStatus}</h4>
    </div>
  );
}

function PartyButtton({
  partyRoomDetail,
  isInsideRoom,
}: {
  partyRoomDetail: PartyRoomDetail;
  isInsideRoom: boolean;
}) {
  const router = useRouter();

  return (
    <div>
      {partyRoomDetail.hostNickname === partyRoomDetail.myNickname ? (
        partyRoomDetail.minPeople <= partyRoomDetail.currentPeople && (
          <button
            onClick={async () => {
              mockInstance
                .post(`/party/rooms/${partyRoomDetail.roomId}/start`)
                .then(() => {
                  router.push(`/parties/${partyRoomDetail.roomId}`);
                });
            }}
          >
            시작
          </button>
        )
      ) : isInsideRoom ? (
        <button
          onClick={async () => {
            mockInstance
              .patch(`/party/rooms/${partyRoomDetail.roomId}`)
              .then(() => {
                router.push(`/parties/${partyRoomDetail.roomId}`);
              });
          }}
        >
          취소하기
        </button>
      ) : (
        <button
          onClick={async () => {
            partyRoomDetail.currentPeople === partyRoomDetail.maxPeople - 1 &&
              mockInstance
                .post(`/party/rooms/${partyRoomDetail.roomId}/start`)
                .then(() => {
                  router.push(`/parties/${partyRoomDetail.roomId}`);
                });
          }}
        >
          참여하기
        </button>
      )}
    </div>
  );
}

function PartyComment({
  partyRoomDetail,
  isInsideRoom,
}: {
  partyRoomDetail: PartyRoomDetail;
  isInsideRoom: boolean;
}) {
  const router = useRouter();
  return (
    <div>
      {/*TODO : 방장이고 최소인원수 넘으면 시작버튼, 게스트면 참여버튼*/}
      {partyRoomDetail.comments.map((comment) => (
        <div key={comment.commentId}>
          <div>
            {comment.nickname === partyRoomDetail.myNickname
              ? comment.nickname
              : '익명'}
          </div>
          <div>
            {comment.isHidden ? '숨김처리되었습니다.' : comment.content}
          </div>
        </div>
      ))}

      {isInsideRoom && (
        <form
          onSubmit={async () => {
            mockInstance
              .post(`/party/rooms/${partyRoomDetail.roomId}/comments`)
              .then(() => {
                router.push(`/parties/${partyRoomDetail.roomId}`);
              });
          }}
        >
          <input type='text' autoFocus value='' />
          <button type='submit'>댓글</button>
        </form>
      )}
    </div>
  );
}

export function Hidden() {
  return <div>해당 방이 존재하지 않습니다.</div>;
}
