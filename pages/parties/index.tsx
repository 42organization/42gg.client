import Link from 'next/link';
import { useState } from 'react';
import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/party/PartyMain.module.scss';

export default function PartyMainPage() {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const { partyRooms, joinedPartyRooms, categorys } = usePartyRoom({
    withJoined: true,
  });

  return (
    <div className={styles.container}>
      <section>
        <h2>참여중인 파티</h2>
        <ul>
          {joinedPartyRooms.map((room) => (
            <li key={room.roomId}>
              <Link href={`/parties/${room.roomId}`}>{room.title}</Link>
              <span>{`${room.currentPeople}/${room.maxPeople}`}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>파티 목록</h2>
        <nav>
          <ul>
            <li key={'all'} onClick={() => setCategoryFilter(null)}>
              전체
            </li>
            {categorys.map((c) => (
              <li
                key={c.categoryId}
                onClick={() => setCategoryFilter(c.categoryId)}
              >
                {c.categoryName}
              </li>
            ))}
          </ul>
        </nav>
        <ul>
          {partyRooms
            .filter(
              (room) => !categoryFilter || room.categoryId === categoryFilter
            )
            .map((room) => (
              <li key={room.roomId}>
                <div>
                  <Link href={`/parties/${room.roomId}`}>{room.title}</Link>
                  <span>{`${room.currentPeople}/${room.maxPeople}`}</span>
                </div>
              </li>
            ))}
        </ul>
      </section>
      <button>
        <Link href='/parties/create'>파티 생성</Link>
      </button>
    </div>
  );
}
