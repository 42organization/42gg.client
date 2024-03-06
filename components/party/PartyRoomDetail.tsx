import { useRouter } from 'next/router';
import { PartyRoomDetail } from 'types/partyTypes';
import { dateToStringShort, getRemainTime, getTimeAgo } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomDetailProps = { partyRoomDetail: PartyRoomDetail };

function PartyDescription({ partyRoomDetail }: PartyRoomDetailProps) {
  const router = useRouter();

  return (
    <div>
      {partyRoomDetail.myNickname && (
        <button
          onClick={async () => {
            //TODO: fetch 안됨. 되게 만들어야함.
            mockInstance
              .patch(`/party/rooms/${partyRoomDetail.roomId}`)
              .then(() => {
                router.push(`/parties/${partyRoomDetail.roomId}`);
              });
          }}
        >
          방 나가기
        </button>
      )}
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            // TODO: 공유하기 버튼에서 dev에서 이게 정상작동 하는지 확인할 필요가 있음
            `http://42gg.kr/parties/${partyRoomDetail.roomId}`
          );
        }}
      >
        공유하기
      </button>
      <h2>제목 : {partyRoomDetail.title}</h2>
      <span>카테고리 : {partyRoomDetail.categoryId}</span>
      <span>
        날짜 :{dateToStringShort(new Date(partyRoomDetail.dueDate))}
        {' (' +
          getRemainTime({ targetTime: new Date(partyRoomDetail.dueDate) }) +
          ')'}
      </span>
      <p>내용 : {partyRoomDetail.content}</p>
      <span>주최자 : {partyRoomDetail.hostNickname}</span>
      <span>
        인원 : {partyRoomDetail.currentPeople + '/' + partyRoomDetail.maxPeople}
      </span>
      <span>
        방 상황 : {partyRoomDetail.roomStatus /*TODO: 배포시 나중에 지울 것 */}
      </span>
    </div>
  );
}

function PartyButtton({ partyRoomDetail }: PartyRoomDetailProps) {
  const router = useRouter();

  return partyRoomDetail.roomStatus !== 'FINISH' ? (
    <div>
      {partyRoomDetail.hostNickname === partyRoomDetail.myNickname ? (
        partyRoomDetail.minPeople <= partyRoomDetail.currentPeople && (
          <button
            onClick={async () => {
              mockInstance
                .post(`/party/rooms/${partyRoomDetail.roomId}/start`)
                .then(() => {
                  //TODO: fetch 안됨. 되게 만들어야함.
                  router.push(`/parties/${partyRoomDetail.roomId}`);
                });
            }}
          >
            시작
          </button>
        )
      ) : (
        <button
          onClick={async () => {
            mockInstance
              .post(`/party/rooms/${partyRoomDetail.roomId}/join`)
              .then(() => {
                //TODO: fetch 안됨. 되게 만들어야함.
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
  const totalComments = partyRoomDetail.comments.length;

  return (
    <div>
      <h3>댓글</h3>
      <span>총 {totalComments}개의 댓글이 있습니다.</span>
      {partyRoomDetail.comments.map((comment) =>
        comment.isHidden ? (
          `숨김 처리된 댓글입니다.`
        ) : (
          <div key={comment.commentId}>
            <span>{comment.nickname}</span>
            <span>{comment.content}</span>
            <span>{getTimeAgo(comment.createDate)}</span>
            <button
              onClick={() => {
                /* TODO: 신고 로직  modal 사용 */
              }}
            >
              신고
            </button>
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
