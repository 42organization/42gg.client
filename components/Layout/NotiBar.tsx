import { useEffect, useState } from 'react';
import NotiItem from './NotiItem';
import { NotiData } from '../../types/notiTypes';
import { BsCheck2Square } from 'react-icons/bs';
import styles from '../../styles/NotiBar.module.scss';
import { getData, deleteData } from '../../utils/axios';

type NotiBarProps = {
  showNotiBarHandler: () => void;
};

export default function NotiBar({ showNotiBarHandler }: NotiBarProps) {
  const [notiData, setNotiData] = useState<NotiData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/pingpong/notifications`);
        setNotiData(res?.data.noti);
      } catch (e) {}
    })();
  }, []);

  const allNotiDeleteHandler = async () => {
    try {
      const res = await deleteData(`/pingpong/notifications`);
      alert(res?.data.message);
      showNotiBarHandler();
    } catch (e) {}
  };

  return (
    <div className={styles.shadow} onClick={showNotiBarHandler}>
      <div className={styles.notiWrap} onClick={(e) => e.stopPropagation()}>
        <button onClick={allNotiDeleteHandler}>
          <BsCheck2Square />
          전체삭제
        </button>
        <div className={styles.notiFullContent}>
          {notiData.length &&
            notiData.map((data: NotiData) => (
              <NotiItem key={data.id} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
}
