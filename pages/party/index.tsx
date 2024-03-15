import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PartyRoomListItem from 'components/party/PartyRoomListItem';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyColorMode from 'hooks/party/usePartyColorMode';
import usePartyRoomList from 'hooks/party/usePartyRoomList';
import styles from 'styles/party/PartyMain.module.scss';

export default function PartyMain() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<number>();
  const [searchTitle, setSearchTitle] = useState(
    Array.isArray(router.query.title)
      ? router.query.title[0]
      : router.query.title
  );
  const { categories } = usePartyCategory();
  const { partyRooms, joinedPartyRooms } = usePartyRoomList({
    withJoined: true,
    searchTitle: searchTitle,
  });

  const filteredRooms = partyRooms.filter(
    (room) => !categoryFilter || room.categoryId === categoryFilter
  );
  const categoryNavItems = [
    { categoryId: undefined, categoryName: '전체' },
    ...categories,
  ];

  usePartyColorMode('PARTY-MAIN');

  return (
    <div className={styles.pageContainer}>
      <section className={styles.joinedRoomContainer}>
        <header>
          <h2>참여중인 파티</h2>
          <Link href='/party/create' className={styles.createRoomButton}>
            방 만들기
          </Link>
        </header>
        <ul>
          {joinedPartyRooms.length > 0 ? (
            joinedPartyRooms.map((room) => (
              <PartyRoomListItem key={room.roomId} room={room} />
            ))
          ) : (
            <>참여중인 방이 없습니다.</>
          )}
        </ul>
      </section>
      <section className={styles.searchBarContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.replace({
              pathname: router.pathname,
              query: { title: searchTitle },
            });
          }}
        >
          <FaSearch className={styles.searchIcon} />
          <input
            placeholder='방 검색하기'
            name='searchTitle'
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          />
        </form>
      </section>
      <section className={styles.allRoomContanier}>
        <nav>
          <ul>
            {categoryNavItems.map((c, idx) => (
              <li
                key={idx}
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
        <ul className={styles.allRoomListWrap}>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <PartyRoomListItem key={room.roomId} room={room} />
            ))
          ) : searchTitle ? (
            <div className={styles.emptyRooms}>검색결과가 없습니다.</div>
          ) : (
            <div className={styles.emptyRooms}>모집중인 방이 없습니다.</div>
          )}
        </ul>
      </section>
    </div>
  );
}
