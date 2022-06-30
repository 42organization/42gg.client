import { useEffect, useState } from 'react';
import { NotiData } from 'types/notiTypes';
import NotiItem from './NotiItem';
import instance from 'utils/axios';
import styles from 'styles/Layout/NotiBar.module.scss';

type NotiBarProps = {
  showNotiBarHandler: () => void;
};

export default function NotiBar({ showNotiBarHandler }: NotiBarProps) {
  const [notiData, setNotiData] = useState<NotiData[]>([]);

  useEffect(() => {
    getNotiDataHandler();
  }, []);

  const getNotiDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNotiData(res?.data.notifications);
    } catch (e) {}
  };

  const allNotiDeleteHandler = async () => {
    try {
      const res = await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      showNotiBarHandler();
    } catch (e) {}
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
                className={styles.refreshBtn}
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
            <button className={styles.refreshBtn} onClick={getNotiDataHandler}>
              &#8635;
            </button>
            <div>💭 새로운 알림이 없습니다!</div>
          </div>
        )}
      </div>
    </div>
  );
}
