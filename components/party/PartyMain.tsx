import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PartyCategory, PartyRoom } from 'types/partyTypes';
import styles from 'styles/party/PartyMain.module.scss';
import PartyRoomListItem from './PartyRoomListItem';

// ================================================================================
// JoinedRooms : 참여한 방 리스트 및 방 생성 버튼
// ================================================================================

type JoinedRoomsProps = {
  joinedPartyRooms: PartyRoom[];
  penaltyPeroid: string | null;
};

function JoinedRooms({ joinedPartyRooms, penaltyPeroid }: JoinedRoomsProps) {
  return (
    <section className={styles.joinedRoomContainer}>
      <header className={styles.joinedRoomHeader}>
        <h2>참여중인 파티</h2>
        {penaltyPeroid ? (
          <div className={styles.penalty}>
            패널티 <span className={styles.timer}>{penaltyPeroid}</span>
          </div>
        ) : (
          <Link href='/party/create' className={styles.createRoomButton}>
            방 만들기
          </Link>
        )}
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
  );
}

// ================================================================================
// SearchBar: 검색창
// ================================================================================

function SearchBar({ titleQuery = '' }: { titleQuery?: string }) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState(titleQuery);

  return (
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
  );
}

// ================================================================================
// AllRooms: 모든 방 리스트
// ================================================================================

const noFilter: PartyCategory = {
  categoryId: 0,
  categoryName: '전체',
};

type AllRoomsProps = {
  partyRooms: PartyRoom[];
  isSearchedResult: boolean;
  categories: PartyCategory[];
};

function AllRooms({ partyRooms, isSearchedResult, categories }: AllRoomsProps) {
  const [categoryFilter, setCategoryFilter] = useState(noFilter.categoryName);
  const filteredRooms = partyRooms.filter(
    (room) =>
      categoryFilter === noFilter.categoryName ||
      categoryFilter === room.categoryName
  );
  const categoryNavItems = [noFilter, ...categories];

  return (
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
      <div className={styles.allRoomListWrap}>
        {filteredRooms.length > 0 ? (
          <ul>
            {filteredRooms.map((room) => (
              <PartyRoomListItem key={room.roomId} room={room} />
            ))}
          </ul>
        ) : isSearchedResult ? (
          <div className={styles.emptyRooms}>검색결과가 없습니다.</div>
        ) : (
          <div className={styles.emptyRooms}>모집중인 방이 없습니다.</div>
        )}
      </div>
    </section>
  );
}

export const PartyMain = { JoinedRooms, SearchBar, AllRooms };
