import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import useSearchBar from 'hooks/useSearchBar';
import styles from 'styles/admin/common/AdminSearchBar.module.scss';

const MAX_SEARCH_LENGTH = 15;

export default function RecruitSearchBar({
  initSearch,
}: {
  initSearch: (searchString?: string) => void;
}) {
  const { keyword, setKeyword, keywordHandler, searchResult, searchBarRef } =
    useSearchBar();

  const adminhandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (keyword === searchResult[0]) {
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
        placeholder='검색하기...'
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
            }}
          >
            <GoSearch />
          </span>
        )}
      </div>
    </div>
  );
}
