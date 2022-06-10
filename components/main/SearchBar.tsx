import React, { useState } from 'react';
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

  const getSearchResultHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (keyword) {
      try {
        const data = await getData(`/pingpong/users/searches/${keyword}`);
        setSearchResult(data.users);
      } catch (e) {
        console.log(e);
      }
    }
  }; // keyword.replace(/[^a-zA-Z0-9\-]/g, ''); 정규표현식 적용하기

  return (
    <div>
      <input
        type='text'
        value={keyword}
        onChange={keywordHandler}
        onKeyUp={getSearchResultHandler}
        onFocus={showDropDownHandler}
        onBlur={showDropDownHandler}
        placeholder='챔피온 검색하기'
      />
      <button>&#128269;</button>
      {showDropDown && (
        <div>
          {searchResult
            ? searchResult?.map((item, i) => <div key={i}>{item}</div>)
            : '검색 결과가 없습니다.'}
        </div>
      )}
    </div>
  );
}
