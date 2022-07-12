import { useEffect, useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { NotiData } from 'types/notiTypes';
import { notiBarState } from 'utils/recoil/layout';
import { errorState } from 'utils/recoil/error';
import NotiItem from './NotiItem';
import instance from 'utils/axios';
import styles from 'styles/Layout/NotiBar.module.scss';

export default function NotiBar() {
  const [notiData, setNotiData] = useState<NotiData[]>([]);
  const [clickRefreshBtn, setClickRefreshBtn] = useState(false);
  const [refreshBtnAnimation, setRefreshBtnAnimation] = useState(false);
  const resetOpenNotiBar = useResetRecoilState(notiBarState);
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    getNotiDataHandler();
  }, []);

  useEffect(() => {
    if (clickRefreshBtn) getNotiDataHandler();
  }, [clickRefreshBtn]);

  const getNotiDataHandler = async () => {
    if (clickRefreshBtn) {
      setRefreshBtnAnimation(true);
      setTimeout(() => {
        setRefreshBtnAnimation(false);
      }, 1000);
    }
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNotiData(res?.data.notifications);
      setClickRefreshBtn(false);
    } catch (e) {
      setErrorMessage('JB04');
    }
  };

  const allNotiDeleteHandler = async () => {
    try {
      await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      resetOpenNotiBar;
    } catch (e) {
      setErrorMessage('JB05');
    }
  };

  return (
    <div className={styles.backdrop} onClick={resetOpenNotiBar}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button onClick={resetOpenNotiBar}>&#10005;</button>
        {notiData.length ? (
          <>
            <div className={styles.btnWrap}>
              <button
                className={styles.deleteBtn}
                onClick={allNotiDeleteHandler}
              >
                &#9745; 전체삭제
              </button>
              <button
                className={
                  refreshBtnAnimation
                    ? styles.refreshBtnAnimation
                    : styles.refreshBtn
                }
                onClick={() => setClickRefreshBtn(true)}
              >
                &#8635;
              </button>
            </div>
            <div>
              {notiData.map((data: NotiData) => (
                <NotiItem key={data.id} data={data} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyContent}>
            <></>
            <button
              className={
                refreshBtnAnimation
                  ? styles.refreshBtnAnimation
                  : styles.refreshBtn
              }
              onClick={() => setClickRefreshBtn(true)}
            >
              &#8635;
            </button>
            <div>💭 새로운 알림이 없습니다!</div>
          </div>
        )}
      </div>
    </div>
  );
}
