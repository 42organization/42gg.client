import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PartyRoomDetail, RoomStatus } from 'types/partyTypes';

export default function PartyDetailPage() {
  const roomId = Number(useRouter().query.partyId);
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = async () => {
    if (!roomId) return;
    try {
      await axios
        // .get(`/party/rooms/${roomId}`) // TODO: api 경로 수정
        .get(`/api/pingpong/party/rooms/${roomId}`)
        .then(({ data }) => {
          setPartyRoomDetail(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (partyRoomDetail === undefined) {
    return <div>로딩중...</div>;
  } else if (!partyRoomDetail) {
    return <div>존재하지 않는 방입니다.</div>;
  }

  const arr = {
    [RoomStatus.PLAYING]: playing(partyRoomDetail),
    [RoomStatus.WAITING]: waiting(partyRoomDetail),
    [RoomStatus.END]: end(partyRoomDetail),
    [RoomStatus.HIDDEN]: hidden(),
  };

  return arr[partyRoomDetail.roomStatus];
}

function commonDetail(partyRoomDetail: PartyRoomDetail) {
  const roomStatus = ['WAITING', 'PLAYING', 'END'];

  return (
    <div>
      <div>카테고리 : {partyRoomDetail.categoryId}</div>
      <div>제목 : {partyRoomDetail.title}</div>
      <div>내용 : {partyRoomDetail.content}</div>
      <div>참여자 수: {partyRoomDetail.currentPeople}</div>
      <div>최소인원 : {partyRoomDetail.minPeople}</div>
      <div>최대인원 : {partyRoomDetail.maxPeople}</div>
      <div>
        날짜 : {/*한국 날짜로 수정 필요*/ partyRoomDetail.dueDate.toString()}
      </div>
      <div>방 상황 : {roomStatus[partyRoomDetail.roomStatus]}</div>
    </div>
  );
}

function waiting(partyRoomDetail: PartyRoomDetail) {
  const isInsideRoom = partyRoomDetail.roomUsers.some(
    (user) => user.nickname === partyRoomDetail.myNickname
  );

  return (
    <div>
      {commonDetail(partyRoomDetail)}

      {/*TODO : 방장이고 최소인원수 넘으면 시작버튼, 게스트면 참여버튼*/}
      {partyRoomDetail.hostNickname === partyRoomDetail.myNickname ? (
        partyRoomDetail.minPeople <= partyRoomDetail.currentPeople && (
          <button
            onClick={async () => {
              await axios.post(`/party/rooms/${partyRoomDetail.roomId}/start`);
              const router = useRouter();
              router.push(`/parties/${partyRoomDetail.roomId}`);
            }}
          >
            시작
          </button>
        )
      ) : isInsideRoom ? (
        <button
          onClick={async () => {
            await axios.patch(`/party/rooms/${partyRoomDetail.roomId}`);
            const router = useRouter();
            router.push(`/parties/${partyRoomDetail.roomId}`);
          }}
        >
          취소하기
        </button>
      ) : (
        <button
          onClick={async () => {
            await axios.post(`/party/rooms/${partyRoomDetail.roomId}`);
            partyRoomDetail.currentPeople === partyRoomDetail.maxPeople - 1 &&
              (await axios.post(
                `/party/rooms/${partyRoomDetail.roomId}/start`
              ));

            const router = useRouter();
            router.push(`/parties/${partyRoomDetail.roomId}`);
          }}
        >
          참여하기
        </button>
      )}

      {partyRoomDetail.comments.map((comment) => {
        return (
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
        );
      })}

      {isInsideRoom && (
        <form
          onSubmit={async () => {
            await axios.post(`/party/rooms/${partyRoomDetail.roomId}/comments`);
            const router = useRouter();
            router.push(`/parties/${partyRoomDetail.roomId}`);
          }}
        >
          <input type='text' autoFocus value='' />
          <button type='submit'>댓글</button>
        </form>
      )}
    </div>
  );
}

//TODO : 시작 버튼 참여버튼이 없음.
//TODO : 댓글 쓸 수 없음.
//TODO : 슬랙 api로 시작되었음을 모두에게 연결
function playing(partyRoomDetail: PartyRoomDetail) {
  const isInsideRoom = partyRoomDetail.roomUsers.some(
    (user) => user.nickname === partyRoomDetail.myNickname
  );

  return (
    <div>
      {commonDetail(partyRoomDetail)}
      {partyRoomDetail.comments.map((comment) => {
        return (
          <div key={comment.commentId}>
            <div>{isInsideRoom ? comment.nickname : '익명'}</div>
            <div>
              {comment.isHidden ? '숨김처리되었습니다.' : comment.content}
            </div>
          </div>
        );
      })}
      playing
    </div>
  );
}

//TODO : 게임이 끝나면 참여자들이 피드백 버튼 활성화?
function end(partyRoomDetail: PartyRoomDetail) {
  return <div>{commonDetail(partyRoomDetail)}</div>;
}

function hidden() {
  return <div>해당 방이 존재하지 않습니다.</div>;
}
