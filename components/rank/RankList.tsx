import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Mode } from 'types/mainType';
import { RankMode, NormalMode, Rank } from 'types/rankTypes';
import { myRankPosition, isMyRankScroll } from 'utils/recoil/myRank';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';

interface RankListProps {
  mode?: Mode;
  season?: string;
}

function isRankModeType(arg: RankMode | NormalMode): arg is RankMode {
  return 'ppp' in arg;
}

export default function RankList({ mode, season }: RankListProps) {
  const [rank, setRank] = useState<Rank | null>(null);
  const [page, setPage] = useState<number>(1);
  const [myRank, setMyRank] = useRecoilState(myRankPosition);
  const [isScroll, setIsScroll] = useRecoilState(isMyRankScroll);
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
    setPage,
  };

  const makePath = () => {
    const modeOption = mode === 'normal' ? 'vip' : 'ranks/single';
    const seasonOption = mode === 'rank' ? `&season=${season}` : '';
    return router.asPath === '/'
      ? `/pingpong/${modeOption}?count=3`
      : `/pingpong/${modeOption}?page=${page}${seasonOption}`;
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

  return (
    <RankListFrame modeType={mode} pageInfo={pageInfo}>
      {rank?.rankList.map((item: NormalMode | RankMode, index) => (
        <RankListItem
          key={item.intraId}
          index={index}
          rankedUser={item}
          mode={mode}
          ppp={isRankModeType(item) ? item.ppp : null}
          level={!isRankModeType(item) ? item.level : null}
          exp={!isRankModeType(item) ? item.exp : null}
        />
      ))}
    </RankListFrame>
  );
}
