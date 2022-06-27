import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import instance from 'utils/axios';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/main/SearchBar.module.scss';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|\-]+$/;
    if (keyword !== '' && checkId.test(keyword))
      makeDebounce(getSearchResultHandler, 800)();
  }, [keyword]);

  const getSearchResultHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/searches?q=${keyword}`);
      setSearchResult(res?.data.users);
    } catch (e) {}
  };

  // 검색 컴포넌트 외부 클릭시 검색결과모달 닫기
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

  const resetKeywordHandler = () => {
    setKeyword('');
  };

  return (
    <div ref={searchBarRef}>
      <div className={styles.searchBar}>
        <input
          type='text'
          value={keyword}
          onChange={keywordHandler}
          onFocus={() => setShowDropDown(true)}
          placeholder='유저 검색하기'
        />
        <div className={styles.buttons}>
          {keyword && (
            <span onClick={resetKeywordHandler}>
              <IoIosCloseCircle style={{ color: 'gray' }} />
            </span>
          )}
          <span>
            <GoSearch />
          </span>
        </div>
      </div>
      {showDropDown && keyword && (
        <div className={styles.dropdown}>
          {searchResult.length
            ? searchResult.map((userId: string) => (
                <Link href={`users/${userId}`} key={userId}>
                  <div>{userId}</div>
                </Link>
              ))
            : '검색 결과가 없습니다.'}
        </div>
      )}
    </div>
  );
}

function makeDebounce(callback: () => void, timeout: number) {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}
