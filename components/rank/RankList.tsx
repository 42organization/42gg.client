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
  toggleMode: MatchMode;
  season?: number;
  isMain?: boolean;
}

function isRankModeType(arg: RankUser | NormalUser): arg is RankUser {
  return 'ppp' in arg;
}

export default function RankList({
  toggleMode,
  season,
  isMain = false,
}: RankListProps) {
  const [myRank, setMyRank] = useRecoilState(myRankState);
  const [isScroll, setIsScroll] = useRecoilState(scrollState);
  const { seasonMode } = useRecoilValue(seasonListState);
  const setError = useSetRecoilState(errorState);
  const [rank, setRank] = useState<Rank>();
  const [page, setPage] = useState<number>(1);
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
    setPage,
  };

  const makePath = () => {
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'normal' ? 'ranks/single' : 'vip';
    const seasonQuery = toggleMode === 'rank' ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeQuery(seasonMode)}?page=1&count=3`
      : `/pingpong/${modeQuery(toggleMode)}?page=${page}${seasonQuery}`;
  };

  useEffect(() => {
    getRankDataHandler();
  }, [page]);

  useEffect(() => {
    page !== 1
      ? ((pageInfo.currentPage = 1), setPage(1))
      : getRankDataHandler();
  }, [toggleMode, season]);

  useEffect(() => {
    if (isScroll) {
      setPage(Math.ceil(myRank[toggleMode] / 20));
    }
  }, [isScroll]);

  useEffect(() => {
    if (isScroll) {
      window.scrollTo({
        top: ((myRank[toggleMode] - 1) % 20) * 45,
        behavior: 'smooth',
      });
      setIsScroll(false);
    }
  }, [rank, isScroll]);

  const getRankDataHandler = async () => {
    try {
      const res = await instance.get(`${makePath()}`);
      setRank(res?.data);
      setMyRank((prev) => ({ ...prev, [toggleMode]: res?.data.myRank }));
    } catch (e) {
      setError('DK01');
    }
  };

  if (isMain) return <RankListMain rank={rank} />;

  return (
    <RankListFrame mode={toggleMode} pageInfo={pageInfo}>
      {rank?.rankList.map((item: NormalUser | RankUser, index) => (
        <RankListItem
          key={index}
          index={index}
          mode={toggleMode}
          user={makeUser(item)}
        />
      ))}
    </RankListFrame>
  );
}

function makeUser(user: NormalUser | RankUser) {
  const makeStatusMessage = (message: string) =>
    message.length > 20 ? `${message.slice(0, 20)}...` : message;
  const makeInit = (init: number) => (user.rank < 0 ? '-' : init);
  return {
    intraId: user.intraId,
    rank: makeInit(user.rank),
    statusMessage: makeStatusMessage(user.statusMessage),
    point: !isRankModeType(user) ? user.exp : makeInit(user.ppp),
    level: !isRankModeType(user) ? user.level : null,
  };
}
