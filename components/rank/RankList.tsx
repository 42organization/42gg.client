import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Rank, RankData } from 'types/rankTypes';
import { myRankPosition, isScrollState } from 'utils/recoil/myRank';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import RankItem from './RankItem';
import PageNation from 'components/Pagination';
import styles from 'styles/RankList.module.scss';

export default function RankList() {
  const [rankData, setRankData] = useState<RankData | null>(null);
  const [myRank, setMyRank] = useRecoilState(myRankPosition);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);
  const [page, setPage] = useState<number>(1);
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();
  const path =
    router.asPath !== '/rank'
      ? `/pingpong/ranks/single?count=3`
      : `/pingpong/ranks/single?page=${page}`;

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
        setErrorMessage('DK01');
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
    router.push(`rank`);
  };

  return router.asPath !== '/rank' ? (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.mainTitle}>Champion</div>
        {rankData?.rankList.map((item: Rank, index) => (
          <RankItem
            key={item.intraId}
            myIntraId={rankData.myIntraId}
            index={index}
            user={item}
            isMain={true}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.division}>
        <div>순위</div>
        <div>intraID (점수)</div>
        <div>상태메시지</div>
        <div>승률</div>
      </div>
      {rankData?.rankList.map((item: Rank, index) => (
        <RankItem
          key={item.intraId}
          myIntraId={rankData.myIntraId}
          index={index}
          user={item}
          isMain={false}
        />
      ))}
      <PageNation
        curPage={rankData?.currentPage}
        totalPages={rankData?.totalPage}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
}
