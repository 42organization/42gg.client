import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IoSendSharp } from 'react-icons/io5';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
} from 'types/partyTypes';
import { instance } from 'utils/axios';
import { nameToRGB } from 'utils/color';
import { dateToKRLocaleTimeString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyRoomDetailProps = {
  partyRoomDetail: PartyRoomDetail;
  fetchRoomDetail: () => void;
};

export default function PartyDetailContentCommentBox({
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
              <div className={styles.commentContentContainer}>
                <div className={styles.commentContent}>{comment.content}</div>
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
  const setSnackbar = useSetRecoilState(toastState);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) {
      setSnackbar({
        toastName: 'input warning',
        message: '입력이 없습니다.',
        severity: 'warning',
        clicked: true,
      });
      return;
    }
    if (comment.length > 100) {
      setSnackbar({
        toastName: 'input warning',
        message: `100자가 넘었습니다. (현재: ${comment.length}자)`,
        severity: 'warning',
        clicked: true,
      });
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
    <form onSubmit={handleCommentSubmit}>
      <div className={styles.commentCreateBar}>
        <input
          className={styles.textBar}
          onInput={handleCommentInput}
          type='text'
          value={comment}
          placeholder='댓글을 입력하세요. (최대 100자)'
        />
        <button className={styles.inputBtn} type='submit'>
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
}
