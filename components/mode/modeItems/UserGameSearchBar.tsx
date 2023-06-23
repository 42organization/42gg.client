import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/main/SearchBar.module.scss';

import useSearchBar from 'hooks/useSearchBar';

export default function UserGameSearchBar() {
  const router = useRouter();
  const { intraId } = router.query;
  const {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
    gamehandleKeyDown,
  } = useSearchBar();

  useEffect(() => {
    if (intraId) setKeyword(String(intraId));
    else setKeyword('');
  }, [router]);

  const clickResultHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    intraId: string
  ) => {
    setKeyword(intraId);
    setShowDropDown(false);
    router.push(`/game?intraId=${intraId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div id={styles.game} className={styles.searchBar} ref={searchBarRef}>
      <GoSearch />
      <input
        type='text'
        onChange={keywordHandler}
        onKeyDown={gamehandleKeyDown}
        onFocus={() => setShowDropDown(true)}
        placeholder='유저 검색하기'
        maxLength={15}
        value={keyword}
      />
      <div className={styles.icons}>
        <span
          className={styles.reset}
          style={{ visibility: `${keyword ? 'visible' : 'hidden'}` }}
          onClick={() => {
            setKeyword('');
          }}
        >
          <IoIosCloseCircle />
        </span>
      </div>
      {showDropDown && keyword && (
        <div className={styles.dropdown}>
          {searchResult.length ? (
            searchResult.map((intraId: string) => (
              <div
                key={intraId}
                onClick={(e) => clickResultHandler(e, intraId)}
              >
                {intraId}
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
