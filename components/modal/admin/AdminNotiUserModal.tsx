import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { errorState } from 'utils/recoil/error';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import styles from 'styles/admin/modal/AdminNoti.module.scss';
import { finished } from 'stream';

let timer: ReturnType<typeof setTimeout>;

const MAX_SEARCH_LENGTH = 15;

export default function AdminNotiUserModal(props: any) {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const notiContent = useRef<HTMLTextAreaElement>(null);

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
      setError('MS02');
    }
  }, [keyword, setError]);

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

  const handleClick = useCallback(() => {
    setSnackBar({
      toastName: 'noti all',
      severity: 'success',
      message: `성공적으로 전송되었습니다! ${notiContent.current?.value}`,
      clicked: true,
    });
    // TODO : 실제 서버에 요청 보내기
  }, []);

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>특정 유저 알림</div>
        <hr className={styles.hr} />
      </div>
      <label className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>intra ID</div>
            <div className={styles.adminSearchBar} ref={searchBarRef}>
              <input
                type='text'
                onChange={keywordHandler}
                onFocus={() => setShowDropDown(true)}
                placeholder='유저 검색하기'
                maxLength={MAX_SEARCH_LENGTH}
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
                  <span
                    onClick={() => {
                      setKeyword('');
                      setShowDropDown(false);
                    }}
                  >
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
                        onClick={() => {
                          setKeyword(intraId);
                          setShowDropDown(false);
                        }}
                      >
                        {intraId}
                      </div>
                    ))
                  ) : (
                    <div className={styles.noneText}>검색 결과가 없습니다.</div>
                  )}
                </div>
              )}
            </div>
            {/* <textarea
              className={styles.intraBlank}
              name='intraID'
              placeholder={'intra ID를 입력하세요'}
            /> */}
          </div>
          <div className={styles.messageWrap}>
            <div className={styles.bodyText}>message</div>
            <textarea
              className={styles.messageBlank}
              name='notification'
              ref={notiContent}
              placeholder={'전달할 알림을 입력해주세요'}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              handleClick();
              setModal({ modalName: null });
            }}
            className={styles.btn1}
          >
            전송
          </button>
          <button
            className={styles.btn2}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </label>
    </div>
  );
}

function debounce(callback: () => void, timeout: number) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}
