import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { errorState } from 'utils/recoil/error';
import { instance } from 'utils/axios';
import { useSetRecoilState } from 'recoil';
import { Dispatch } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface useSearchBarReturn {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  keywordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showDropDown: boolean;
  setShowDropDown: Dispatch<SetStateAction<boolean>>;
  searchResult: string[];
  searchBarRef: RefObject<HTMLDivElement>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  gamehandleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

let timer: ReturnType<typeof setTimeout>;

function debounce(callback: () => void, timeout: number) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}

export default function useSearchBar(): useSearchBarReturn {
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const setError = useSetRecoilState<string>(errorState);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getSearchResultHandler = useCallback(async () => {
    try {
      const res = await instance.get(
        `/pingpong/users/searches?intraId=${keyword}`
      );
      setSearchResult(res?.data.users);
    } catch (e) {
      setError('JB06');
    }
  }, [keyword, setError]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchResult.map((data) => {
        if (data === keyword) setShowDropDown(false);
        event.currentTarget.blur();
        router.push(`/users/detail?intraId=${keyword}`);
      });
    }
  };

  const gamehandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchResult.map((data) => {
        if (data === keyword) setShowDropDown(false);
        event.currentTarget.blur();
        router.push(`/game?intraId=${keyword}`, undefined, {
          shallow: true,
        });
      });
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

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|-]+$/;
    if (keyword === '' || (keyword.length && !checkId.test(keyword))) {
      clearTimeout(timer);
      setSearchResult([]);
    } else if (checkId.test(keyword)) {
      debounce(getSearchResultHandler, 300)();
    }
  }, [keyword, getSearchResultHandler]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
    handleKeyDown,
    gamehandleKeyDown,
  };
}
