import { useRouter } from 'next/router';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomDetailProps = { partyRoomDetail: PartyRoomDetail };

function PartyDescription({ partyRoomDetail }: PartyRoomDetailProps) {
  return (
    <div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            // window.location.href // TODO: 공유하기 버튼에서 dev에서 이게 정상작동 하는지 확인할 필요가 있음
            `http://42gg.kr/parties/${partyRoomDetail.roomId}`
          );
        }}
      >
        공유하기
      </button>
      <h2>제목 : {partyRoomDetail.title}</h2>
      <span>카테고리 : {partyRoomDetail.categoryId}</span>
      <span>
        날짜 :
        {new Date(partyRoomDetail.dueDate).getMinutes() -
          new Date().getMinutes() +
          `분 남음`}
      </span>
      <p>내용 : {partyRoomDetail.content}</p>
      <span>
        인원 : {partyRoomDetail.currentPeople + '/' + partyRoomDetail.maxPeople}
      </span>
      <span>주최자 : {partyRoomDetail.hostNickname}</span>
      <span>참여자 : {/* 호버로 인원 보여주기. */}</span>
      <span>방 상황 : {partyRoomDetail.roomStatus}</span>
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
