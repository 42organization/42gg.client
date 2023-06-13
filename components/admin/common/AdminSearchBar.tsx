import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/admin/common/AdminSearchBar.module.scss';
import useSearchBar from 'hooks/useSearchBar';

const MAX_SEARCH_LENGTH = 15;

export default function AdminSearchBar({
  initSearch,
}: {
  initSearch: (intraId?: string) => void;
}) {
  const {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
  } = useSearchBar();

  const adminhandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (keyword === searchResult[0]) {
        setShowDropDown(false);
        event.currentTarget.blur();
        initSearch(keyword);
      }
    }
  };

  return (
    <div className={styles.adminSearchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={keywordHandler}
        onKeyDown={adminhandleKeyDown}
        onFocus={() => setShowDropDown(true)}
        placeholder='유저 검색하기'
        maxLength={MAX_SEARCH_LENGTH}
        value={keyword}
      />
      <div className={styles.icons}>
        {keyword ? (
          <span
            className={styles.reset}
            onClick={() => {
              initSearch();
              setKeyword('');
            }}
          >
            <IoIosCloseCircle />
          </span>
        ) : (
          <span
            onClick={() => {
              initSearch();
              setShowDropDown(false);
            }}
          >
            <GoSearch />
          </span>
        )}
      </div>
      {showDropDown && keyword && (
        <div className={styles.dropdown}>
          {searchResult.length ? (
            searchResult.map((intraId: string) => (
              <div
                key={intraId}
                onClick={() => {
                  setKeyword(intraId);
                  initSearch(intraId);
                  setShowDropDown(false);
                }}
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
