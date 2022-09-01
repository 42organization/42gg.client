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

interface RankListProps {
  mode?: Mode;
  season?: string;
}

function isRankType(arg: Rank | Normal): arg is Rank {
  return 'ppp' in arg;
}

export default function RankList({ mode, season }: RankListProps) {
  const [rankData, setRankData] = useState<RankData | null>(null);
  const [page, setPage] = useState(1);
  const [myRank, setMyRank] = useRecoilState(myRankPosition);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();
  const isMainPage = router.asPath !== '/rank' ? true : false;
  const pageInfo = {
    currentPage: rankData?.currentPage,
    totalPage: rankData?.totalPage,
    setPage,
  };

  const makePath = () => {
    const option = mode === 'normal' ? 'vip' : 'ranks/single';
    const seasonOption =
      mode === 'rank' && season ? `season=${season.split('season')[1]}` : '';
    return isMainPage
      ? `/pingpong/${option}?count=3`
      : `/pingpong/${option}?page=${page}${seasonOption}`;
  };

  useEffect(() => {
    getRankDataHandler();
  }, [page, mode, season]);

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

  const getRankDataHandler = async () => {
    try {
      const res = await instance.get(`${makePath()}`);
      setRankData(res?.data);
      setMyRank(res?.data.myRank);
    } catch (e) {
      setErrorMessage('DK01');
    }
  };

  return (
    <RankListFrame isMain={isMainPage} modeType={mode} pageInfo={pageInfo}>
      {rankData?.rankList.map((item: Normal | Rank, index) => (
        <RankListItem
          key={item.intraId}
          index={index}
          rankedUser={item}
          isMain={isMainPage}
          mode={mode}
          ppp={isRankType(item) ? item.ppp : null}
          level={!isRankType(item) ? item.level : null}
          exp={!isRankType(item) ? item.exp : null}
        />
      ))}
    </RankListFrame>
  );
}
