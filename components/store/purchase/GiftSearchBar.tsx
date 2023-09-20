import { useEffect, Dispatch, SetStateAction } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import { GiftRequest } from 'types/itemTypes';
import useSearchBar from 'hooks/useSearchBar';
import styles from 'styles/main/SearchBar.module.scss';

export default function GiftSearchBar({
  setGiftReqData,
}: {
  setGiftReqData: Dispatch<SetStateAction<GiftRequest>>;
}) {
  const {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
  } = useSearchBar();

  useEffect(() => {
    if (keyword === '') {
      setGiftReqData({
        ownerId: '',
      });
    }
  }, [keyword]);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    intraId: string
  ) => {
    setKeyword(intraId);
    setGiftReqData({
      ownerId: intraId,
    });
    setShowDropDown(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchResult.map((data) => {
        if (data === keyword) {
          setShowDropDown(false);
          event.currentTarget.blur();
          setGiftReqData({
            ownerId: data,
          });
        }
      });
    }
  };

  return (
    <div id={styles.gift} className={styles.searchBar} ref={searchBarRef}>
      <input
        type='text'
        onChange={keywordHandler}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropDown(true)}
        placeholder='선물할 유저 검색하기'
        maxLength={15}
        value={keyword}
      />
      <div className={styles.icons}>
        {keyword ? (
          <span className={styles.reset} onClick={() => setKeyword('')}>
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
              <div key={intraId} onClick={(e) => handleClick(e, intraId)}>
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
