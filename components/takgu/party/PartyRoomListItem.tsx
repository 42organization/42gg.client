import Link from 'next/link';
import { PartyRoom } from 'types/partyTypes';
import { getRemainTime } from 'utils/handleTime';
import styles from 'styles/takgu/party/PartyRoomListItem.module.scss';

export default function PartyRoomListItem({ room }: { room: PartyRoom }) {
  const roomStatusKo =
    room.status === 'START'
      ? '진행중'
      : room.status === 'FINISH'
      ? '마감'
      : '모집중';

  return (
    <li key={room.roomId}>
      <Link
        href={`/takgu/party/room?id=${room.roomId}`}
        className={`${styles.roomWrap} ${
          room.status !== 'OPEN' ? styles.transparent : ''
        }`}
      >
        <article className={styles.roomContent}>
          <header>
            <div className={styles.roomCategory}>#{room.categoryName}</div>
            <div className={`${styles.roomStatus} ${styles[room.status]}`}>
              {roomStatusKo}
            </div>
          </header>
          <p className={styles.roomTitle}>{room.title}</p>
        </article>
        <aside className={styles.roomInfo}>
          <time className={styles.roomDueDate}>
            {room.status === 'OPEN'
              ? getRemainTime({ targetTime: new Date(room.dueDate) })
              : '마감'}
          </time>
          <div
            className={styles.roomPeople}
          >{`${room.currentPeople}/${room.maxPeople}`}</div>
        </aside>
      </Link>
    </li>
  );
}
