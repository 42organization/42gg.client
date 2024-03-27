import Link from 'next/link';
import { PartyRoom } from 'types/partyTypes';
import styles from 'styles/party/PartyRoomListItem.module.scss';

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
        href={`/party/${room.roomId}`}
        className={`${styles.roomWrap} ${
          room.status !== 'OPEN' ? styles.transparent : ''
        }`}
      >
        <div className={styles.roomDescWrap}>
          <header>
            <div className={styles.roomCategory}>#{room.categoryName}</div>
            <div className={`${styles.roomStatus} ${styles[room.status]}`}>
              {roomStatusKo}
            </div>
          </header>
          <div className={styles.roomTitle}>{room.title}</div>
        </div>
        <div
          className={styles.roomPeopleWrap}
        >{`${room.currentPeople}/${room.maxPeople}`}</div>
      </Link>
    </li>
  );
}
