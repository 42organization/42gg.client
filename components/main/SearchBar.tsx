import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import useSearchBar from 'hooks/useSearchBar';
import styles from 'styles/main/SearchBar.module.scss';

export default function SearchBar() {
  const {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
    handleKeyDown,
  } = useSearchBar();

  return (
    <div className={styles.searchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={keywordHandler}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropDown(true)}
        placeholder='유저 검색하기'
        maxLength={15}
        value={keyword}
      />
      <div className={styles.icons}>
        {keyword ? (
          <span className={styles.reset} onClick={() => setKeyword('')}>
            <IoIosCloseCircle />
          </span>
        ) : (
          <span>
            <GoSearch />
          </span>
        )}
      </div>
      {showDropDown && keyword && (
        <div className={styles.dropdown}>
          {searchResult.length ? (
            searchResult.map((intraId: string) => (
              <Link
                href={`/takgu/users/detail?intraId=${intraId}`}
                key={intraId}
              >
                <div>{intraId}</div>
              </Link>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
