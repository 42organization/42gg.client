import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PartyRoomListItem from 'components/party/PartyRoomListItem';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyColorMode from 'hooks/party/usePartyColorMode';
import usePartyRoomList from 'hooks/party/usePartyRoomList';
import styles from 'styles/party/PartyMain.module.scss';

const noFilterName = '전체';

export default function PartyMain() {
  const router = useRouter();
  const titleQuery = Array.isArray(router.query.title)
    ? router.query.title[0]
    : router.query.title;
  const { partyRooms, joinedPartyRooms } = usePartyRoomList({
    withJoined: true,
    searchTitle: titleQuery,
  });
  const [searchTitle, setSearchTitle] = useState(titleQuery);
  const { categories } = usePartyCategory();
  const [categoryFilter, setCategoryFilter] = useState<string>(noFilterName);

  const filteredRooms = partyRooms.filter(
    (room) =>
      categoryFilter == noFilterName || categoryFilter === room.categoryName
  );
  const categoryNavItems = [
    { categoryId: undefined, categoryName: noFilterName },
    ...categories,
  ];

  usePartyColorMode('PARTY-MAIN');

  return (
    <div className={styles.pageContainer}>
      <section className={styles.joinedRoomContainer}>
        <header className={styles.joinedRoomHeader}>
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
      <section className={styles.searchBar}>
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
            defaultValue={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          />
        </form>
      </section>
      <section className={styles.allRoomContanier}>
        <nav className={styles.categoryNav}>
          <ul>
            {categoryNavItems.map((c) => (
              <li
                key={c.categoryName}
                onClick={() => setCategoryFilter(c.categoryName)}
                className={
                  categoryFilter === c.categoryName ? styles.selected : ''
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
