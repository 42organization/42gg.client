import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/main/SearchBar.module.scss';

let timer: ReturnType<typeof setTimeout>;

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const setErrorMessage = useSetRecoilState(errorState);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|\-]+$/;
    if (keyword !== '' && checkId.test(keyword)) {
      debounce(getSearchResultHandler, 800)();
    } else {
      clearTimeout(timer);
    }
    setSearchResult([]);
  }, [keyword]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // 검색 컴포넌트 외부 클릭시 검색결과모달 닫기

  const getSearchResultHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/searches?q=${keyword}`);
      setSearchResult(res?.data.users);
    } catch (e) {
      setErrorMessage('JB06');
    }
  };

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
    <div ref={searchBarRef}>
      <div className={styles.searchBar}>
        <input
          type='text'
          onChange={keywordHandler}
          onFocus={() => setShowDropDown(true)}
          placeholder='유저 검색하기'
        />
        <div className={styles.buttons}>
          {keyword && (
            <span
              className={styles.resetBtn}
              onClick={() => {
                setKeyword('');
              }}
            >
              <IoIosCloseCircle style={{ color: 'gray' }} />
            </span>
          )}
          <span>
            <GoSearch />
          </span>
        </div>
        {showDropDown && keyword && (
          <div className={styles.dropdown}>
            {searchResult.length ? (
              searchResult.map((intraId: string) => (
                <Link href={`/users/${intraId}`} key={intraId}>
                  <div>{intraId}</div>
                </Link>
              ))
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </div>
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
