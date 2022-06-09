import { useState } from 'react';
import { SearchData } from '../../types/mainType';
import { getData } from '../../utils/axios';

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchData | null>(null);

  const showSearchBoxHandler = () => {
    setShowSearchBox(!showSearchBox);
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        onChange={keywordHandler}
        onFocus={showSearchBoxHandler}
        onBlur={showSearchBoxHandler}
        placeholder='챔피온 검색하기'
      />
      <button>&#128269;</button>
      {showSearchBox && (
        <div>
          {searchResult
            ? searchResult.users.map((item: string) => <div>{item}</div>)
            : '검색 결과가 없습니다.'}
        </div>
      )}
    </div>
  );
}
