import { useState, useCallback } from 'react';
import { getData } from '../../utils/axios';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[] | null>(null);

  const showDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const getSearchResultHandler = async () => {
    const filteredKeyword = keyword.replace(/[^a-zA-Z0-9\-]/g, '');
    if (filteredKeyword) {
      try {
        const data = await getData(
          `/pingpong/users/searches/${filteredKeyword}`
        );
        setSearchResult(data.users);
      } catch (e) {}
    }
  };

  return (
    <div>
      <input
        type='text'
        value={keyword}
        onChange={keywordHandler}
        onKeyUp={makeDebounce(getSearchResultHandler, 800)}
        onFocus={showDropDownHandler}
        onBlur={showDropDownHandler}
        placeholder='챔피온 검색하기'
      />
      <button>&#128269;</button>
      {showDropDown && (
        <div>
          {!searchResult || !keyword
            ? '검색 결과가 없습니다.'
            : searchResult?.map((item, i) => <div key={i}>{item}</div>)}
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
