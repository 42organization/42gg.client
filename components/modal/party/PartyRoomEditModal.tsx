import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Switch } from '@mui/material';
import {
  PartyComment,
  PartyRoomDetail,
  PartyRoomStatus,
  roomStatusOpts,
} from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/party/PartyRoomEdit.module.scss';

export default function PartyRoomEditModal({ roomId }: { roomId: number }) {
  const setSnackBar = useSetRecoilState(toastState);
  const [room, setRoom] = useState<PartyRoomDetail>();

  function handleStatus(e: ChangeEvent<HTMLSelectElement>) {
    instanceInPartyManage
      .patch(`/rooms/${room?.roomId}`, {
        status: e.target.value,
      })
      .then(() => {
        setRoom({
          ...(room as PartyRoomDetail),
          status: e.target.value as PartyRoomStatus,
        });
      })
      .catch(() => {
        setSnackBar({
          toastName: 'PATCH request',
          message: '방 상태를 변경할 수 없습니다',
          severity: 'error',
          clicked: true,
        });
      });
  }
  function handleCommentHidden(comment: PartyComment) {
    instanceInPartyManage
      .patch(`/comments/${comment.commentId}`, {
        isHidden: !comment.isHidden,
      })
      .then(() => {
        setRoom({
          ...room!,
          comments: room!.comments.map((c) =>
            c.commentId === comment.commentId
              ? { ...c, isHidden: !comment.isHidden }
              : c
          ),
        });
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
      <header className={styles.roomHeader}>
        <h2>
          <span className={styles.categoryName}>#{room.categoryName}</span>
          {room.title}
        </h2>
        <select onChange={handleStatus} defaultValue={room.status}>
          {roomStatusOpts.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </header>
      <section className={styles.roomDate}>
        <div>작성일: {dateToStringShort(new Date(room.createDate))}</div>
        <div>마감일: {dateToStringShort(new Date(room.dueDate))}</div>
      </section>
      <section className={styles.roomContent}>
        <p>{room.content}</p>
      </section>
      <section className={styles.roomUsers}>
        <h3>
          현재 {room.roomUsers.length} | 모집인원{' '}
          {`${room.minPeople} - ${room.maxPeople}`}
        </h3>
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
      <section className={styles.roomComments}>
        <h3>코멘트</h3>
        <ul>
          {room.comments.map((comment) => (
            <li key={comment.commentId}>
              <header>
                <div>
                  <span className={styles.commentUserName}>
                    {comment.nickname}
                    <span className={styles.intraId}> ({comment.intraId})</span>
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
