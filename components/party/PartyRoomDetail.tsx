import { Dispatch, SetStateAction, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { dateToStringShort, getRemainTime, getTimeAgo } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import { PartyReport } from 'components/modal/Party/PartyReportModal';
import usePartyRoom from 'hooks/party/usePartyList';

type PartyRoomDetailProps = {
  partyRoomDetail: PartyRoomDetail;
  onClick: boolean;
  setOnClick: Dispatch<SetStateAction<boolean>>;
};

function PartyDescription({
  partyRoomDetail,
  setOnClick,
  onClick,
}: PartyRoomDetailProps) {
  const handlerExit = async () => {
    await mockInstance.patch(`/party/rooms/${partyRoomDetail.roomId}`);
    setOnClick(!onClick);
  };
  const { categorys } = usePartyRoom({ isAdmin: false, withJoined: false });

  return (
    <div>
      {/* <PartyReport reportName={'ROOM'} roomId={partyRoomDetail.roomId} /> */}
      <button
        onClick={() => {
          // TODO: 신고 로직  modal 사용 신고 모달 띄우기
        }}
      >
        신고
      </button>
      {partyRoomDetail.myNickname && (
        <button onClick={handlerExit}>방 나가기</button>
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
      <span>
        카테고리 :
        {categorys
          ? categorys.find(
              (categoryId) => partyRoomDetail.categoryId === Number(categoryId)
            )?.categoryName
          : 'not found'}
      </span>
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

function PartyButtton({
  partyRoomDetail,
  setOnClick,
  onClick,
}: PartyRoomDetailProps) {
  const handlerStart = async () => {
    await mockInstance
      .post(`/party/rooms/${partyRoomDetail.roomId}/start`)
      .then((res) => {
        setOnClick(!onClick);
        console.log(res.status);
      })
      .catch((error) => {
        console.error('에러가 났습니다.', error);
      });
  };

  const handlerJoin = async () => {
    await mockInstance.post(`/party/rooms/${partyRoomDetail.roomId}/join`);
    setOnClick(!onClick);
  };

  return partyRoomDetail.roomStatus !== 'FINISH' ? (
    <div>
      {partyRoomDetail.hostNickname === partyRoomDetail.myNickname ? (
        partyRoomDetail.minPeople <= partyRoomDetail.currentPeople && (
          <button onClick={handlerStart}>시작</button>
        )
      ) : (
        <button onClick={handlerJoin}>참여하기</button>
      )}
    </div>
  ) : (
    <div></div>
  );
}

function PartyComment({
  partyRoomDetail,
  onClick,
  setOnClick,
}: PartyRoomDetailProps) {
  const totalComments = partyRoomDetail.comments.length;
  const handlerComments = async () => {
    await mockInstance.post(`/party/rooms/${partyRoomDetail.roomId}/comments`);
    setOnClick(!onClick);
  };

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
            <button>{/*TODO: 온클릭시 신고 모달 띄우기 */}신고</button>
          </div>
        )
      )}
      {partyRoomDetail.myNickname &&
        partyRoomDetail.roomStatus !== 'FINISH' && (
          <form onSubmit={handlerComments}>
            <input type='text' />
            <button type='submit'>댓글</button>
          </form>
        )}
    </div>
  );
}

export default function PartyDetail({
  partyRoomDetail,
  onClick,
  setOnClick,
}: PartyRoomDetailProps) {
  return (
    <div>
      <PartyDescription
        partyRoomDetail={partyRoomDetail}
        onClick={onClick}
        setOnClick={setOnClick}
      />
      <PartyButtton
        partyRoomDetail={partyRoomDetail}
        onClick={onClick}
        setOnClick={setOnClick}
      />
      <PartyComment
        partyRoomDetail={partyRoomDetail}
        onClick={onClick}
        setOnClick={setOnClick}
      />
    </div>
  );
}
