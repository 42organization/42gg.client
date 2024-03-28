import { ChangeEvent, FormEvent, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
} from 'types/partyTypes';
import { instance } from 'utils/axios';
import { dateToKRLocaleTimeString } from 'utils/handleTime';
import styles from 'styles/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyRoomDetailProps = {
  partyRoomDetail: PartyRoomDetail;
  nameToRGB: (name: string) => string;
  fetchRoomDetail: () => void;
};

export default function PartyDetailContentCommentBox({
  partyRoomDetail,
  nameToRGB,
  fetchRoomDetail,
}: PartyRoomDetailProps) {
  const totalComments = partyRoomDetail.comments.length;

  return (
    <>
      <div className={styles.contentCommentBox}>
        <div className={styles.comment}>댓글 ({totalComments})</div>
        <hr />
        <CommentBox comments={partyRoomDetail.comments} nameToRGB={nameToRGB} />
      </div>
      <CommentCreateBar
        roomId={partyRoomDetail.roomId}
        status={partyRoomDetail.status}
        myNickname={partyRoomDetail.myNickname}
        fetchRoomDetail={fetchRoomDetail}
      />
    </>
  );
}

function CommentBox({
  comments,
  nameToRGB,
}: {
  comments: PartyComment[];
  nameToRGB: (name: string) => string;
}) {
  return (
    <div className={styles.commentBox}>
      {comments.map((comment) =>
        comment.isHidden ? (
          <div key={comment.commentId} className={styles.commentHidden}>
            숨김 처리된 댓글입니다.
          </div>
        ) : (
          <>
            <div
              key={comment.commentId}
              style={{ color: nameToRGB(comment.nickname) }}
              className={styles.comment}
            >
              <div className={styles.commentIntraId}>
                {comment.intraId || comment.nickname}
              </div>
              <div>
                <div>{comment.content}</div>
                <div className={styles.commentInfo}>
                  <div className={styles.commentTime}>
                    {`(${dateToKRLocaleTimeString(
                      new Date(comment.createDate)
                    )})`}
                  </div>
                  <PartyRoomDetailButton.ReportComment />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

type CommentCreateBarProps = {
  roomId: number;
  status: PartyRoomStatus;
  myNickname: string | null;
  fetchRoomDetail: () => void;
};

function CommentCreateBar({
  roomId,
  status,
  myNickname,
  fetchRoomDetail,
}: CommentCreateBarProps) {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    await instance.post(`/party/rooms/${roomId}/comments`, {
      content: comment,
    });
    fetchRoomDetail();
    setComment('');
  };

  const handleCommentInput = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  if (status !== 'OPEN' || !myNickname) {
    return <> </>;
  }

  return (
    <div className={styles.commentCreateBar}>
      <form onSubmit={handleCommentSubmit}>
        <input
          className={styles.textBar}
          onInput={handleCommentInput}
          type='text'
          value={comment}
        />
        <button className={styles.inputBtn} type='submit'>
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
}
