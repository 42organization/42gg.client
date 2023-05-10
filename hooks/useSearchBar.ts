import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import { useSetRecoilState } from 'recoil';
import { Dispatch } from 'react';
import { useCallback } from 'react';

type useSearchBarResult = [
  string,
  Dispatch<SetStateAction<string>>,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  string[],
  RefObject<HTMLDivElement>
];

let timer: ReturnType<typeof setTimeout>;

function debounce(callback: () => void, timeout: number) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}

export default function useSearchBar(): useSearchBarResult {
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
      setError('JB06');
    }
  }, [keyword, setError]);

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

  return [
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
  ];
}
