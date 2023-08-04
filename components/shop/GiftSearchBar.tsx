import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/main/SearchBar.module.scss';

import useSearchBar from 'hooks/useSearchBar';

export default function GiftSearchBar() {
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
              // TODO: 선택한 유저 아이디를 FOR '검색한 사람 아이디' 부분에 넣어주기
              <div key={intraId}>{intraId}</div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
