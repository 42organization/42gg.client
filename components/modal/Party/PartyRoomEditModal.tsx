import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Switch } from '@mui/material';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
} from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/party/PartyRoomEdit.module.scss';

const roomStatusOpts: PartyRoomStatus[] = ['OPEN', 'START', 'FINISH', 'HIDDEN'];

export default function PartyRoomEditModal({ roomId }: { roomId: number }) {
  const setSnackBar = useSetRecoilState(toastState);
  const [room, setRoom] = useState<PartyRoomDetail>();

  function handleStatus(e: ChangeEvent<HTMLSelectElement>) {
    setRoom({
      ...(room as PartyRoomDetail),
      status: e.target.value as PartyRoomStatus,
    });
  }
  function handleCommentHidden(comment: PartyComment) {
    instanceInPartyManage
      .patch(`/comments/${comment.commentId}`, {
        isHidden: !comment.isHidden,
      })
      .then(() => {
        setRoom(
          room && {
            ...room,
            comments: room.comments.map((c) =>
              c.commentId === comment.commentId
                ? { ...c, isHidden: !comment.isHidden }
                : c
            ),
          }
        );
      })
      .catch(() => {
        setSnackBar({
          toastName: 'PATCH request',
          message: '코멘트를 수정할 수 없습니다',
          severity: 'error',
          clicked: true,
        });
      });
  }

  useEffect(() => {
    instanceInPartyManage
      .get(`/rooms/${roomId}`)
      .then(({ data }: { data: PartyRoomDetail }) => {
        setRoom(data);
      });
  }, []);

  if (!room) return null;

  return (
    <div className={styles.container}>
      <header className={styles.modalHeader}>
        <h2>
          <span className={styles.categoryName}>
            #{room.categoryName} #{`${room.minPeople}-${room.maxPeople}인`}
          </span>
          {room.title}
        </h2>
        <select onChange={handleStatus}>
          {roomStatusOpts.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </header>
      {/*
      <div>작성일: {dateToStringShort(new Date(room.createDate))}</div>
      <div>마감일: {dateToStringShort(new Date(room.dueDate))}</div> */}
      <p className={styles.roomContent}>{room.content}</p>
      <section className={styles.roomUsersContainer}>
        <ul>
          {room.roomUsers.map((user) => (
            <li key={user.roomUserId}>
              <div className={styles.userImage}>
                <Image
                  src={user.userImage ?? ''}
                  objectFit='cover'
                  fill
                  alt='13'
                />
              </div>
              <div>{user.nickname}</div>
              <div>({user.intraId})</div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.commentContainer}>
        <h3>코멘트</h3>
        <ul>
          {room.comments.map((comment) => (
            <li key={comment.commentId}>
              <header>
                <div>
                  <span className={styles.commentUserName}>
                    {comment.nickname}
                  </span>
                  <span className={styles.commentDate}>
                    {dateToStringShort(new Date(comment.createDate))}
                  </span>
                </div>
                <div>
                  {comment.isHidden ? '숨겨짐' : ''}
                  <Switch
                    checked={comment.isHidden}
                    onChange={() => handleCommentHidden(comment)}
                    inputProps={{ 'aria-label': 'hidden switch' }}
                  />
                </div>
              </header>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
