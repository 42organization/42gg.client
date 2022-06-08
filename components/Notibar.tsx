import { useEffect, useState } from 'react';
import NotiItem from './NotiItem';
import { NotiData } from '../types/notiTypes';
import { BsCheck2Square } from 'react-icons/bs';
import styles from '../styles/Notibar.module.scss';
import { getData } from '../utils/axios';

type NotibarProps = {
  showNotibarHandler: () => void;
};

export default function Notibar({ showNotibarHandler }: NotibarProps) {
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

  const allNotiDeleteHandler = () => {};

  return (
    <div className={styles.shadow} onClick={showNotibarHandler}>
      <div className={styles.notiWrap} onClick={(e) => e.stopPropagation()}>
        <span className={styles.delete} onClick={allNotiDeleteHandler}>
          <BsCheck2Square />
          전체삭제
        </span>
        <div className={styles.notiFullContent}>
          {notiData?.map((data: NotiData) => (
            <NotiItem key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
