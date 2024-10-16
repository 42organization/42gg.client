import router from 'next/router';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import useSearchBar from 'hooks/useSearchBar';
import styles from 'styles/agenda/Profile/AgendaUserSearchBar.module.scss';

const AgendaUserSearchBar = () => {
  const {
    keyword,
    setKeyword,
    keywordHandler,
    showDropDown,
    setShowDropDown,
    searchResult,
    searchBarRef,
    handleKeyDown,
  } = useSearchBar();

  const changeUser = (intraId: string) => {
    setKeyword('');
    setShowDropDown(false);
    router.push(`/agenda/profile/user?id=${intraId}`);
  };

  return (
    <>
      <div className={styles.warp} ref={searchBarRef}>
        <div className={styles.agendaUserSearchBar}>
          <input
            type='text'
            onChange={keywordHandler}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropDown(true)}
            placeholder='유저 검색하기'
            maxLength={12}
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
        </div>
        {showDropDown && keyword && (
          <div className={styles.dropdown}>
            {searchResult.length ? (
              searchResult.map((intraId: string) => (
                <div onClick={() => changeUser(intraId)} key={intraId}>
                  {intraId}
                </div>
              ))
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AgendaUserSearchBar;
