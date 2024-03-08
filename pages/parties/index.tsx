import Link from 'next/link';
import { useState } from 'react';
import PartyRoomList from 'components/party/PartyRoomList';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/party/PartyMain.module.scss';

export default function PartyMainPage() {
  const { categorys } = usePartyCategory();
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { partyRooms, joinedPartyRooms, updateRoomsByTitle } = usePartyRoom({
    withJoined: true,
  });

  const roomsFiltered = partyRooms.filter(
    (room) => !categoryFilter || room.categoryId === categoryFilter
  );

  return (
    <div className={styles.pageContainer}>
      <section>
        <h2>참여중인 파티</h2>
        <PartyRoomList rooms={joinedPartyRooms} />
      </section>
      <section className={styles.roomToolBar}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateRoomsByTitle(searchKeyword);
          }}
        >
          <input
            type='text'
            placeholder='방 제목'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </form>
        <button>
          <Link href='/parties/create'>파티 생성</Link>
        </button>
      </section>
      <section className={styles.roomListAllContainer}>
        <nav className={styles.categoryNav}>
          <ul>
            <li
              key={0}
              onClick={() => setCategoryFilter(null)}
              className={!categoryFilter ? styles.selected : ''}
            >
              전체
            </li>
            {categorys?.map((c) => (
              <li
                key={c.categoryId}
                onClick={() => setCategoryFilter(c.categoryId)}
                className={
                  categoryFilter === c.categoryId ? styles.selected : ''
                }
              >
                {c.categoryName}
              </li>
            ))}
          </ul>
        </nav>
        <PartyRoomList rooms={roomsFiltered} />
      </section>
    </div>
  );
}
