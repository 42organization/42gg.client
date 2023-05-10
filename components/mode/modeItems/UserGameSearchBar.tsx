// 유저 검색하기 /game에 진입시 왼쪽정렬
// 서치를 할때 데이터상 일치하는 목록이 있다면 밑에 리스트를 보여주고 그부분을 클릭했을떄 이동
// enter로는 이동 불가 리스트를 클릭할때만 이동

//test() 함수 특정 문자열 패턴을 포함하는지 확인
//const checkId = /^[a-z|A-Z|0-9|-]+$/; ^ ? 전체 문자열이 일치해야한다.
//검색기능 업데이트하고 싶다.
//왜 5개만 뜨지?
// shallow: true 새로고침 없이 url을 바꿔준다.
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/main/SearchBar.module.scss';

let timer: ReturnType<typeof setTimeout>;

export default function UserGameSearchBar() {
  const router = useRouter();
  const { intraId } = router.query;
  const [keyword, setKeyword] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const setError = useSetRecoilState(errorState);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkId = /^[a-z|A-Z|0-9|-]+$/;
    if (keyword === '' || (keyword.length && !checkId.test(keyword))) {
      clearTimeout(timer);
      setSearchResult([]);
    } else if (checkId.test(keyword)) {
      debounce(getSearchResultHandler, 500)();
    }
  }, [keyword]);

  useEffect(() => {
    if (intraId) setKeyword(String(intraId));
    else setKeyword('');
  }, [router]);

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  const getSearchResultHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/searches?q=${keyword}`);
      setSearchResult(res?.data.users);
    } catch (e) {
      setError('JB06');
    }
  };

  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    )
      setShowDropDown(false);
  };

  const keywordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const clickResultHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    intraId: string
  ) => {
    setKeyword(intraId);
    setShowDropDown(false);
    router.push(`/game?intraId=${intraId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div id={styles.game} className={styles.searchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={keywordHandler}
        onFocus={() => setShowDropDown(true)}
        placeholder='유저 검색하기'
        maxLength={15}
        value={keyword}
      />
      <div className={styles.icons}>
        {keyword ? (
          <span
            className={styles.reset}
            onClick={() => {
              setKeyword('');
            }}
          >
            <IoIosCloseCircle />
          </span>
        ) : (
          <span>
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
                onClick={(e) => clickResultHandler(e, intraId)}
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
// 실제 사용 0.5초후 
//setTimeout은 일정시간이 지난 후에 함수가 실행되도록 처리하는 역할을 한다.
//clearTimeout은 setTimeout을 취소하는 역할을 한다.
//callback 다른 함수가 실행을 끝낸뒤 callback되는 함수를 말한다.
//
function debounce(callback: () => void, timeout: number) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}
