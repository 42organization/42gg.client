import { useRouter } from 'next/router';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomDetailProps = { partyRoomDetail: PartyRoomDetail };

function PartyDescription({ partyRoomDetail }: PartyRoomDetailProps) {
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
  const router = useRouter();
  // TODO: 호스트도 나가기 버튼 필요.
  return partyRoomDetail.roomStatus !== 'FINISH' ? (
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
      ) : partyRoomDetail.myNickname ? (
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
            mockInstance
              .post(`/party/rooms/${partyRoomDetail.roomId}/join`)
              .then(() => {
                router.push(`/parties/${partyRoomDetail.roomId}`);
              });
          }}
        >
          참여하기
        </button>
      )}
    </div>
  ) : (
    <div></div>
  );
}

function PartyComment({ partyRoomDetail }: PartyRoomDetailProps) {
  const router = useRouter();
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
      {partyRoomDetail.myNickname &&
        partyRoomDetail.roomStatus !== 'FINISH' && (
          <form
            onSubmit={async () => {
              mockInstance
                .post(`/party/rooms/${partyRoomDetail.roomId}/comments`)
                .then(() => {
                  router.push(`/parties/${partyRoomDetail.roomId}`);
                });
            }}
          >
            <input type='text' />
            <button type='submit'>댓글</button>
          </form>
        )}
    </div>
  );
}

export default function PartyDetail({ partyRoomDetail }: PartyRoomDetailProps) {
  return (
    <div>
      <PartyDescription partyRoomDetail={partyRoomDetail} />
      <PartyButtton partyRoomDetail={partyRoomDetail} />
      <PartyComment partyRoomDetail={partyRoomDetail} />
    </div>
  );
}
