import { useSetRecoilState } from 'recoil';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
} from 'types/partyTypes';
import { instance } from 'utils/axios';
import { getTimeAgo } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';

type PartyRoomDetailProps = {
  partyRoomDetail: PartyRoomDetail;
  fetchRoomDetail: () => void;
};

type CommentCreateBarProps = {
  roomId: number;
  roomStatus: PartyRoomStatus;
  myNickname: string | null;
  fetchRoomDetail: () => void;
};

export default function PartyDetailCommentBox({
  partyRoomDetail,
  fetchRoomDetail,
}: PartyRoomDetailProps) {
  const totalComments = partyRoomDetail.comments.length;

  return (
    <div>
      <div>{partyRoomDetail.content}</div>
      <div>댓글({totalComments})</div>
      <CommentLine comments={partyRoomDetail.comments} />
      <CommentCreateBar
        roomId={partyRoomDetail.roomId}
        roomStatus={partyRoomDetail.roomStatus}
        myNickname={partyRoomDetail.myNickname}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}

function CommentLine({ comments }: { comments: PartyComment[] }) {
  const setModal = useSetRecoilState(modalState);

  const reportComment = (commentId: number) => {
    setModal({
      partyReport: {
        name: 'COMMENT',
        commentId,
      },
      modalName: 'PARTY-REPORT',
    });
  };

  return (
    <>
      {comments.map((comment) =>
        comment.isHidden ? (
          <div key={comment.commentId}>`숨김 처리된 댓글입니다.`</div>
        ) : (
          <div key={comment.commentId}>
            <div>{comment.content}</div>
            <span>{`(${getTimeAgo(comment.createDate)})`}</span>
            <span>{comment.nickname}</span>
            <button onClick={() => reportComment(comment.commentId)}>
              신고
            </button>
          </div>
        )
      )}
    </>
  );
}

function CommentCreateBar({
  roomId,
  roomStatus,
  myNickname,
  fetchRoomDetail,
}: CommentCreateBarProps) {
  const handlerComments = async () => {
    await instance.post(`/party/rooms/${roomId}/comments`);
    fetchRoomDetail();
  };

  if (!myNickname || roomStatus === 'FINISH') {
    return <> </>;
  }

  return (
    <div>
      <form onSubmit={handlerComments}>
        <input type='text' />
        <button type='submit'>댓글</button>
      </form>
    </div>
  );
}
