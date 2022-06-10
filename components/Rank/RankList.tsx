import React, { useEffect, useState } from 'react';
import styles from '../../styles/RankList.module.css';
import { Rank, RankData } from '../../types/rankTypes';
import RankItem from './RankItem';
import { getData } from '../../utils/axios';

type RankType = {
  count?: number | null;
};

export default function RankList({ count }: RankType) {
  const [rankData, setRankData] = useState<Rank[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/ranks/${1}?count=20`);
        setRankData(data.rankList);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!rankData) return <div>Loading...</div>;

  return (
    <>
      {count ? (
        <div>
          {rankData.map((item: Rank) => (
            <RankItem key={item.userId} user={item} count={count} />
          ))}
        </div>
      ) : (
        <div>
          <div className={styles.title}>Ranking</div>
          <div className={styles.container}>
            <div className={styles.division}>
              <div className={styles.rank}>랭킹</div>
              <div className={styles.userId}>유저 (점수)</div>
              <div className={styles.statusMessage}>상태메시지</div>
              <div className={styles.winRate}>승률</div>
            </div>
            {rankData?.map((item: Rank) => (
              <RankItem key={item.userId} user={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
