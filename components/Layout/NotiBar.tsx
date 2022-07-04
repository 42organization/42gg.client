import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { NotiData } from 'types/notiTypes';
import { errorState } from 'utils/recoil/error';
import NotiItem from './NotiItem';
import instance from 'utils/axios';
import styles from 'styles/Layout/NotiBar.module.scss';

type NotiBarProps = {
  showNotiBarHandler: () => void;
};

export default function NotiBar({ showNotiBarHandler }: NotiBarProps) {
  const [notiData, setNotiData] = useState<NotiData[]>([]);
  const setErrorMessage = useSetRecoilState(errorState);
  const [refreshBtnAnimation, setRefreshBtnAnimation] =
    useState<boolean>(false);
  useEffect(() => {
    getNotiDataHandler();
  }, []);

  const getNotiDataHandler = async () => {
    setRefreshBtnAnimation(true);
    setTimeout(() => {
      setRefreshBtnAnimation(false);
    }, 1000);
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNotiData(res?.data.notifications);
    } catch (e) {
      setErrorMessage('JB04');
    }
  };

  const allNotiDeleteHandler = async () => {
    try {
      const res = await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      showNotiBarHandler();
    } catch (e) {
      setErrorMessage('JB05');
    }
  };

  return (
    <div className={styles.backdrop} onClick={showNotiBarHandler}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button onClick={showNotiBarHandler}>&#10005;</button>
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
                onClick={getNotiDataHandler}
              >
                &#8635;
              </button>
            </div>
            <div>
              {notiData.map((data: NotiData) => (
                <NotiItem
                  key={data.id}
                  data={data}
                  showNotiBarHandler={showNotiBarHandler}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emtyContent}>
            <></>
            <button
              className={
                refreshBtnAnimation
                  ? styles.refreshBtnAnimation
                  : styles.refreshBtn
              }
              onClick={getNotiDataHandler}
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
