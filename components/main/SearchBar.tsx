import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { getData } from '../../utils/axios';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|\-]+$/;
    if (keyword !== '' && checkId.test(keyword))
      makeDebounce(getSearchResultHandler, 800)();
  }, [keyword]);

  const getSearchResultHandler = async () => {
    try {
      const res = await getData(`/pingpong/users/searches/${keyword}`);
      setSearchResult(res?.data.users);
    } catch (e) {}
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        value={keyword}
        onChange={keywordHandler}
        onFocus={() => setShowDropDown(true)}
        placeholder='유저 검색하기'
      />
      <span>&#128269;</span>
      {showDropDown && (
        <div>
          {searchResult.length && keyword
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
