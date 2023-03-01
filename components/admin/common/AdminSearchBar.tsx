import { useEffect, useState, useRef, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/admin/common/AdminSearchBar.module.scss';

let timer: ReturnType<typeof setTimeout>;

const MAX_SEARCH_LENGTH = 15;

export default function AdminSearchBar({
  initSearch,
}: {
  initSearch: (intraId?: string) => void;
}) {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const setError = useSetRecoilState(errorState);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const getSearchResultHandler = useCallback(async () => {
    try {
      const res = await instance.get(`/pingpong/users/searches?q=${keyword}`);
      setSearchResult(res?.data.users);
    } catch (e) {
      setError('MS02');
    }
  }, [keyword, setError]);

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|-]+$/;
    if (keyword === '' || (keyword.length && !checkId.test(keyword))) {
      clearTimeout(timer);
      setSearchResult([]);
    } else if (checkId.test(keyword)) {
      debounce(getSearchResultHandler, 500)();
    }
  }, [keyword, getSearchResultHandler]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    )
      setShowDropDown(false);
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className={styles.adminSearchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={keywordHandler}
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

function debounce(callback: () => void, timeout: number) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}
