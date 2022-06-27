import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/RankList.module.scss';
import { Rank, RankData } from '../../types/rankTypes';
import instance from '../../utils/axios';
import { useRecoilState } from 'recoil';
import { myRankPosition, isScrollState } from '../../utils/recoil/myRank';
import RankItem from './RankItem';
import PageNation from '../Pagination';

export default function RankList() {
  const [rankData, setRankData] = useState<RankData | null>(null);
  const [myRank, setMyRank] = useRecoilState(myRankPosition);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const path =
    router.asPath !== '/rank'
      ? `/pingpong/ranks/count/${3}`
      : `/pingpong/ranks/${page}`;

  useEffect(() => {
    if (isScroll) {
      setPage(Math.ceil(myRank / 20));
    }
  }, [isScroll]);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`${path}`);
        setRankData(res?.data);
        setMyRank(res?.data.myRank);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page, isScroll === true]);

  useEffect(() => {
    if (isScroll) {
      window.scrollTo({ top: ((myRank - 1) % 20) * 45, behavior: 'smooth' });
      setIsScroll(false);
    }
  }, [rankData]);

  const pageChangeHandler = (pages: number) => {
    setPage(pages);
    // router.push(`rank`); 추가 가능성 염두
  };

  return router.asPath !== '/rank' ? (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.mainTitle}>Champion</div>
        {rankData?.rankList.map((item: Rank) => (
          <RankItem key={item.rank} user={item} isMain={true} />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Ranking</h1>
      <div className={styles.container}>
        <div className={styles.division}>
          <div className={styles.divItem}>랭킹</div>
          <div className={styles.divItem}>intra ID (점수)</div>
          <div className={styles.divItem}>상태메시지</div>
          <div className={styles.divItem}>승률</div>
        </div>
        {rankData?.rankList.map((item: Rank) => (
          <RankItem key={item.userId} user={item} isMain={false} />
        ))}
        <PageNation
          curPage={rankData?.currentPage}
          totalPages={rankData?.totalPage}
          pageChangeHandler={pageChangeHandler}
        />
      </div>
    </div>
  );
}
