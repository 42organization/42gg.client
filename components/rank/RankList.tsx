import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Mode } from 'types/mainType';
import { Rank, Normal, RankData } from 'types/rankTypes';
import { myRankPosition, isScrollState } from 'utils/recoil/myRank';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';
import PageNation from 'components/Pagination';
import styles from 'styles/RankList.module.scss';

import axios from 'axios';

interface RankListProps {
  mode?: Mode;
  season?: string;
}

function isRankType(arg: any): arg is Rank {
  return 'ppp' in arg;
} // 타입확인하는 함수

export default function RankList({ mode, season }: RankListProps) {
  const [rankData, setRankData] = useState<RankData | null>(null);
  const [myRank, setMyRank] = useRecoilState(myRankPosition);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);
  const [page, setPage] = useState(1);
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();
  const isMainPage = router.asPath !== '/rank' ? true : false;
  const path = () => {
    const option = mode === 'normal' ? 'vip' : 'ranks';
    const season_op =
      mode === 'rank' && season ? `season=${season.split('season')[1]}` : '';
    return isMainPage
      ? `/pingpong/${option}/single?count=3`
      : `/pingpong/${option}/single?page=${page}${season_op}`;
  };

  useEffect(() => {
    getRankData();
  }, [page, mode]);

  useEffect(() => {
    if (isScroll) {
      setPage(Math.ceil(myRank / 20));
    }
  }, [isScroll]);

  useEffect(() => {
    if (isScroll) {
      window.scrollTo({ top: ((myRank - 1) % 20) * 45, behavior: 'smooth' });
      setIsScroll(false);
    }
  }, [rankData, isScroll]);

  const getRankData = async () => {
    try {
      // const res = await instance.get(`${path}`);
      const res = await axios.get(`http://localhost:3000/api/${path()}`); // 백에서 api 만들면 뺄 예정
      setRankData(res?.data);
      setMyRank(res?.data.myRank);
    } catch (e) {
      setErrorMessage('DK01');
    }
  };

  const pageChangeHandler = (pages: number) => {
    setPage(pages);
    router.push('/rank');
  };

  return (
    <RankListFrame isMain={isMainPage} modeType={mode}>
      {rankData?.rankList.map((item: Normal | Rank, index) => (
        <RankListItem
          key={item.intraId}
          index={index}
          userData={item}
          isMain={isMainPage}
          mode={mode}
          ppp={isRankType(item) ? item.ppp : null} // type에 또는을 써서 타입 확인 후 할당해주었습니다!
          level={!isRankType(item) ? item.level : null}
          exp={!isRankType(item) ? item.exp : null}
        />
      ))}
      {!isMainPage && (
        <PageNation
          curPage={rankData?.currentPage}
          totalPages={rankData?.totalPage}
          pageChangeHandler={pageChangeHandler}
        />
      )}
    </RankListFrame>
  );
}
