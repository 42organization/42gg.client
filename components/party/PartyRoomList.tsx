import Link from 'next/link';
import { PartyRoom } from 'types/partyTypes';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/party/ParytyRoomList.module.scss';

export default function PartyRoomList({ rooms }: { rooms: PartyRoom[] }) {
  const { categorys } = usePartyCategory();

  return (
    <ul className={styles.roomListWrap}>
      {rooms.map((room) => (
        <li key={room.roomId}>
          <Link
            href={`/parties/${room.roomId}`}
            className={styles.roomItemWrap}
          >
            <div className={styles.roomItemDescWrap}>
              <div className={styles.roomItemCategory}>
                {categorys?.find((c) => c.categoryId === room.categoryId)
                  ?.categoryName ?? '???'}
              </div>
              <div className={styles.roomItemTitle}>{room.title}</div>
            </div>
            <div
              className={styles.roomPeopleWrap}
            >{`${room.currentPeople}/${room.maxPeople}`}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
