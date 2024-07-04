import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import useRecruitmentUserFilter from 'hooks/takgu/recruitments/useRecruitmentUserFilter';
import useSearchBar from 'hooks/useSearchBar';
import styles from 'styles/takgu/admin/common/AdminSearchBar.module.scss';

const MAX_SEARCH_LENGTH = 15;

export default function RecruitSearchBar({ recruitId }: { recruitId: number }) {
  const { keyword, setKeyword, searchBarRef } = useSearchBar();

  const { initSearch } = useRecruitmentUserFilter(recruitId);

  const adminhandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      initSearch(keyword);
    }
  };

  return (
    <div className={styles.adminSearchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
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
