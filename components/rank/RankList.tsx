import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import { seasonListState } from 'utils/recoil/seasons';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import RankListMain from './topRank/RankListMain';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';

interface RankListProps {
  mode?: MatchMode;
  season?: string;
}

function isRankModeType(arg: RankUser | NormalUser): arg is RankUser {
  return 'ppp' in arg;
}

export default function RankList({ mode, season }: RankListProps) {
  const [myRank, setMyRank] = useRecoilState(myRankState);
  const [isScroll, setIsScroll] = useRecoilState(scrollState);
  const { seasonMode } = useRecoilValue(seasonListState);
  const setErrorMessage = useSetRecoilState(errorState);
  const [rank, setRank] = useState<Rank>();
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const isMain = router.asPath === '/';
  const isRankSeason = mode === 'rank';
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
    setPage,
  };

  const makePath = () => {
    const modeOption = (targetMode?: string) =>
      targetMode !== 'normal' ? 'ranks/single' : 'vip';
    const seasonOption = isRankSeason ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeOption(seasonMode)}?page=1&count=3`
      : `/pingpong/${modeOption(mode)}?page=${page}${seasonOption}`;
  };

  useEffect(() => {
    getRankDataHandler();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getRankDataHandler();
  }, [mode, season]);

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
  }, [rank, isScroll]);

  const getRankDataHandler = async () => {
    try {
      const res = await instance.get(`${makePath()}`);
      setRank(res?.data);
      setMyRank(res?.data.myRank);
    } catch (e) {
      setErrorMessage('DK01');
    }
  };

  if (isMain) return <RankListMain rank={rank} />;

  return (
    <RankListFrame isRankMode={isRankSeason} pageInfo={pageInfo}>
      {rank?.rankList.map((item: NormalUser | RankUser, index) => (
        <RankListItem
          key={item.intraId}
          index={index}
          user={item}
          isRankMode={isRankSeason}
          ppp={isRankModeType(item) ? item.ppp : null}
          level={!isRankModeType(item) ? item.level : null}
          exp={!isRankModeType(item) ? item.exp : null}
        />
      ))}
    </RankListFrame>
  );
}
