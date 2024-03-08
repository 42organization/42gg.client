import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { PartyRoomDetail, PartyRoomStatus } from 'types/partyTypes';
import { dateToStringShort } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/admin/party/PartyRoomEdit.module.scss';

const roomStatusOpts: PartyRoomStatus[] = ['OPEN', 'START', 'FINISH', 'HIDDEN'];

export default function PartyRoomEdit({ roomId }: { roomId: number }) {
  const { categorys } = usePartyCategory();
  const [room, setRoom] = useState<PartyRoomDetail | null>(null);

  const categoryName =
    categorys?.find((c) => c.categoryId === room?.categoryId)?.categoryName ??
    '';

  useEffect(() => {
    mockInstance
      .get(`/party/admin/rooms/${roomId}`)
      .then(({ data }: { data: PartyRoomDetail }) => {
        setRoom(data);
      });
  }, []);

  return (
    <>
      {room && categorys && (
        <div className={styles.tmp}>
          <div className={styles.container}>
            <div className={styles.headerWrap}>
              <h2>{room.title} </h2>
              <select
                onChange={(e) =>
                  setRoom({
                    ...room,
                    roomStatus: e.target.value as PartyRoomStatus,
                  })
                }
              >
                {roomStatusOpts.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <hr />
            <div>{categoryName}</div>
            <div>{`${room.minPeople}-${room.maxPeople}인`}</div>
            <div>작성일: {dateToStringShort(new Date(room.createDate))}</div>
            <div>마감일: {dateToStringShort(new Date(room.dueDate))}</div>
            <p>{room.content}</p>
            <hr />
            <div className={styles.roomUsersContainer}>
              <h3>참가자</h3>
              <ul>
                {room.roomUsers.map((user) => (
                  <li key={user.roomUserId}>
                    {user.nickname}({user.intraId})
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className={styles.commentContainer}>
              <h3>코멘트</h3>
              <ul>
                {room.comments.map((c) => (
                  <li key={c.commentId}>
                    <div className={styles.commentHeader}>
                      <div>
                        <span className={styles.commentUserName}>
                          {c.nickname}
                        </span>
                        <span className={styles.commentDate}>
                          {dateToStringShort(new Date(c.createDate))}
                        </span>
                      </div>
                      <div>
                        {c.isHidden ? '숨겨짐' : ''}
                        <Switch
                          checked={c.isHidden}
                          onChange={(e) => {
                            setRoom({
                              ...room,
                              comments: room.comments.map((comment) =>
                                comment.commentId === c.commentId
                                  ? { ...comment, isHidden: e.target.checked }
                                  : comment
                              ),
                            });
                            // mockInstance
                            //   .patch(`/party/admin/comments/${c.commentId}`, {
                            //     isHidden: c.isHidden,
                            //   })
                            //   .then(() => {
                            //     setRoom({
                            //       ...room,
                            //       comments: room.comments.map((comment) =>
                            //         comment.commentId === c.commentId
                            //           ? { ...comment, isHidden: !c.isHidden }
                            //           : comment
                            //       ),
                            //     });
                            //   });
                          }}
                          inputProps={{ 'aria-label': 'hidden switch' }}
                        />
                      </div>
                    </div>
                    <p className={styles.commentContent}>{c.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
