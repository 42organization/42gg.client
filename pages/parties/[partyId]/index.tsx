import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';

export default function PartyDetailPage() {
  const router = useRouter();
  const party_id = Number(router.query.partyId);
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  async () =>
    await axios
      .get(`/party/rooms/${party_id}`)
      .then(({ data }) => {
        setPartyRoomDetail(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('잘못된 요청입니다.');
        router.push('/parties');
      });
  if (partyRoomDetail?.isHidden) {
    alert('삭제된 파티입니다.');
    router.push('/parties');
  }
  return (
    <div>
      {partyRoomDetail ? (
        <div>
          <h2>파티 제목: {partyRoomDetail.title}</h2>
          {partyRoomDetail.isOver ||
          partyRoomDetail.currentPeople ===
            partyRoomDetail.maxPeople ? null : partyRoomDetail.myNickname ===
              partyRoomDetail.hostNickname &&
            partyRoomDetail.currentPeople >= partyRoomDetail.minPeople ? (
            <button>파티 시작하기</button>
          ) : (
            <button>파티 참가하기</button>
          )}
          <button>나가기</button>
          <button>신고하기</button>
          <h3>파티 설명: {partyRoomDetail.content}</h3>
          <h4>파티 카테고리: {partyRoomDetail.categoryId}</h4>
          <h4>파티 최소 인원: {partyRoomDetail.minPeople}</h4>
          <h4>파티 최대 인원: {partyRoomDetail.maxPeople}</h4>
          <h4>파티 현재 인원: {partyRoomDetail.currentPeople}</h4>
          {
            // Date는 react node에서 지원하지 않음. 따라서 string으로 변경해야함.
            /* 
              <h4>파티 마감일: {partyRoomDetail.dueDate}</h4>
              <h4>파티 생성일: {partyRoomDetail.createDate}</h4> 
           */
          }
          <h4>파티 호스트: {partyRoomDetail.hostNickname}</h4>
          <h4>파티 참여자: {partyRoomDetail.roomUsers.length}</h4>
          <h4>파티 댓글: {partyRoomDetail.comments.length}</h4>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}
