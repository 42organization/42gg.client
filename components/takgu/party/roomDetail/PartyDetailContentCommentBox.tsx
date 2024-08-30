import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
} from 'types/takgu/partyTypes';
import { instance } from 'utils/axios';
import { nameToRGB } from 'utils/color';
import { dateToKRLocaleTimeString } from 'utils/handleTime';
import styles from 'styles/takgu/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyRoomDetailProps = {
  partyRoomDetail: PartyRoomDetail;
  fetchRoomDetail: () => void;
};

export default function PartyDetailCommentBox({
  partyRoomDetail,
  fetchRoomDetail,
}: PartyRoomDetailProps) {
  const totalComments = partyRoomDetail.comments.length;
  const [isSpreadComment, setIsSpreadComment] = useState(false);
  const spreadbtnName = isSpreadComment ? '▲ 접기' : '▼ 펼치기';
  const onSpreadComment = () => {
    setIsSpreadComment(!isSpreadComment);
  };

  return (
    <>
      <div className={styles.contentCommentBox}>
        <div className={styles.commentBoxInfo}>
          <div>댓글 ({totalComments})</div>
          <button className={styles.spreadBtn} onClick={onSpreadComment}>
            {spreadbtnName}
          </button>
        </div>
        <hr />
        <CommentBox
          comments={partyRoomDetail.comments}
          isSpreadComment={isSpreadComment}
        />
        <CommentCreateBar
          roomId={partyRoomDetail.roomId}
          status={partyRoomDetail.status}
          myNickname={partyRoomDetail.myNickname}
          fetchRoomDetail={fetchRoomDetail}
        />
      </div>
    </>
  );
}

function CommentBox({
  comments,
  isSpreadComment,
}: {
  comments: PartyComment[];
  isSpreadComment: boolean;
}) {
  const commentBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div
      className={`${styles.commentBox} ${isSpreadComment ? styles.spread : ''}`}
      ref={commentBoxRef}
    >
      {comments.map((comment) =>
        comment.isHidden ? (
          <div
            key={comment.commentId + 'Hidden'}
            className={styles.commentHidden}
          >
            숨김 처리된 댓글입니다.
          </div>
        ) : (
          <div
            key={comment.commentId}
            style={{ color: nameToRGB(comment.nickname) }}
            className={styles.comment}
          >
            <div className={styles.commentIntraId}>
              {comment.intraId || comment.nickname}
            </div>
            <div className={styles.commentContentContainer}>
              <div className={styles.commentContent}>{comment.content}</div>
              <div className={styles.commentInfo}>
                <div className={styles.commentTime}>
                  {`(${dateToKRLocaleTimeString(
                    new Date(comment.createDate)
                  )})`}
                </div>
                <PartyRoomDetailButton.ReportComment
                  commentId={comment.commentId}
                />
              </div>
            </div>
          </div>
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
    if (e.target.value.length < 100) {
      setComment(e.target.value);
    }
  };

  if (status !== 'OPEN' || !myNickname) {
    return <> </>;
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <div className={styles.commentCreateBar}>
        <input
          className={styles.textBar}
          onInput={handleCommentInput}
          type='text'
          value={comment}
          placeholder='댓글을 입력하세요.'
        />
        <button className={styles.inputBtn} type='submit'>
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
}
