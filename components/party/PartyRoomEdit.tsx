import { FormEvent, useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { dateToStringShort } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import usePartyRoom from 'hooks/party/usePartyList';

export default function PartyRoomEdit({ roomId }: { roomId: number }) {
  const { categorys } = usePartyRoom();
  const [room, setRoom] = useState<PartyRoomDetail | null>(null);

  useEffect(() => {
    mockInstance
      .get(`/party/admin/rooms/${roomId}`)
      .then(({ data }: { data: any }) => {
        setRoom({
          ...data,
          dueDate: new Date(data.dueDate),
          createDate: new Date(data.createDate),
        });
      });
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('새로운 방: ', room);
  }

  return (
    <>
      {room && (
        <form onSubmit={handleSubmit}>
          <h2>
            방 제목:{' '}
            <input
              type='text'
              value={room.title}
              onChange={(e) => setRoom({ ...room, title: e.target.value })}
            />
          </h2>
          <div>
            <label htmlFor=''>카테고리: </label>
            {categorys.map((c) => (
              <div key={c.categoryId}>
                <input
                  id={`categoryId:${c.categoryId}`}
                  type='radio'
                  name='category'
                  value={c.categoryName}
                  checked={c.categoryId === room.categoryId}
                  onChange={() =>
                    setRoom({ ...room, categoryId: c.categoryId })
                  }
                />
                <label htmlFor={`categoryId:${c.categoryId}`}>
                  {c.categoryName}
                </label>
              </div>
            ))}
          </div>
          <div>
            최소-최대인원 :{' '}
            <input
              type='number'
              value={`${room.minPeople}`}
              onChange={(e) => setRoom({ ...room, minPeople: +e.target.value })}
            />
            -
            <input
              type='number'
              value={`${room.maxPeople}`}
              onChange={(e) => setRoom({ ...room, maxPeople: +e.target.value })}
            />
          </div>
          <div>작성일: {dateToStringShort(room.createDate)}</div>
          <div>
            마감일:{' '}
            <input
              type='date'
              defaultValue={room.dueDate.toISOString().substring(0, 10)}
              onChange={(e) =>
                setRoom({ ...room, dueDate: new Date(e.target.value) })
              }
            />
          </div>
          <div>
            <div>내용: </div>
            <textarea
              cols={30}
              rows={10}
              defaultValue={room.content}
              onChange={(e) => setRoom({ ...room, content: e.target.value })}
            />
          </div>
          <div>
            상태
            <select
              onChange={(e) =>
                setRoom({
                  ...room,
                  roomStatus: e.target.value,
                } as PartyRoomDetail)
              }
            >
              <option value='open'>open</option>
              <option value='start'>start</option>
              <option value='finish'>finish</option>
              <option value='hidden'>hidden</option>
            </select>
          </div>
          <div>
            참가자 수 :{room.currentPeople}
            <ul>
              {room.roomUsers.map((user, idx) => (
                <li key={user.roomUserId}>
                  {idx}: {user.nickname}
                </li>
              ))}
            </ul>
          </div>
          <div>
            코멘트
            <ul>
              {room.comments.map((c) => (
                <li key={c.commentId}>
                  작성자: {c.nickname}
                  <br />
                  내용: {c.content}
                  <br />
                  작성일: {dateToStringShort(new Date(c.createDate))}
                  <br />
                  숨김여부:{' '}
                  <select name='' defaultValue={c.isHidden + ''}>
                    <option value='true'>숨김</option>
                    <option value='false'>안숨김</option>
                  </select>
                  <br />
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          <button type='submit'>저장</button>
        </form>
      )}
    </>
  );
}
