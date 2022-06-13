import { useEffect, useState } from 'react';
import { SearchData } from '../../types/mainType';
import { getData } from '../../utils/axios';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchData | null>(null);

  useEffect(() => {
    const checkId = /[^a-zA-Z0-9\-]/;
    if (keyword !== '' && !checkId.test(keyword))
      makeDebounce(getSearchResultHandler, 1500)();
  }, [keyword]);

  const showDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const getSearchResultHandler = async () => {
    try {
      const data = await getData(`/pingpong/users/searches/${keyword}`);
      setSearchResult(data);
    } catch (e) {}
  };

  return (
    <div>
      <input
        type='text'
        value={keyword}
        onChange={keywordHandler}
        onFocus={showDropDownHandler}
        onBlur={showDropDownHandler}
        placeholder='유저 검색하기'
      />
      <span>&#128269;</span>
      {showDropDown && (
        <div>
          {searchResult && keyword
            ? searchResult.users.map((item, i) => <div key={i}>{item}</div>)
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
