import { useEffect, useState } from 'react';
import NotiItem from './NotiItem';
import { NotiData } from '../types/notiTypes';
import { BsCheck2Square } from 'react-icons/bs';
import styles from '../styles/NotiBar.module.scss';
import { getData } from '../utils/axios';

type NotiBarProps = {
  showNotiBarHandler: () => void;
};

export default function NotiBar({ showNotiBarHandler }: NotiBarProps) {
  const [notiData, setNotiData] = useState<NotiData[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/notifications`);
        setNotiData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const allNotiDeleteHandler = () => {
    // DELETE 요청하기
  };

  return (
    <div className={styles.shadow} onClick={showNotiBarHandler}>
      <div className={styles.notiWrap} onClick={(e) => e.stopPropagation()}>
        <button onClick={allNotiDeleteHandler}>
          <BsCheck2Square />
          전체삭제
        </button>
        <div className={styles.notiFullContent}>
          {notiData?.map((data: NotiData) => (
            <NotiItem key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
