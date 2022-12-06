import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import {
  myRankState,
  pageState,
  myRankScrollState,
  topScrollState,
} from 'utils/recoil/myRank';
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
export default function RankList({
  toggleMode,
  season,
  isMain = false,
}: RankListProps) {
  const [myRank, setMyRank] = useRecoilState(myRankState);
  const [page, setPage] = useRecoilState(pageState);
  const { seasonMode } = useRecoilValue(seasonListState);
  const setError = useSetRecoilState(errorState);
  const setMyRankScroll = useSetRecoilState(myRankScrollState);
  const setTopScroll = useSetRecoilState(topScrollState);
  const [rank, setRank] = useState<Rank>();
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
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
    async function waitRankList() {
      await getRankHandler();
    }
    waitRankList().then(() => {
      if (myRank.clicked) {
        setMyRankScroll(true);
        setMyRank((prev) => ({ ...prev, clicked: false }));
      } else setTopScroll(true);
    });
  }, [page]);

  useEffect(() => {
    if (myRank.clicked) setPage(Math.ceil(myRank[toggleMode] / 20));
  }, [myRank]);

  useEffect(() => {
    page !== 1 ? ((pageInfo.currentPage = 1), setPage(1)) : getRankHandler();
  }, [toggleMode, season]);

  const getRankHandler = async () => {
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
    <RankListFrame toggleMode={toggleMode} pageInfo={pageInfo}>
      {rank?.rankList.map((item: NormalUser | RankUser, index) => (
        <RankListItem
          key={index}
          index={index}
          toggleMode={toggleMode}
          user={makeUser(item)}
        />
      ))}
    </RankListFrame>
  );
}

function isRankModeType(arg: RankUser | NormalUser): arg is RankUser {
  return 'ppp' in arg;
}

function makeUser(user: NormalUser | RankUser) {
  const makeStatusMessage = (message: string) =>
    message.length > 10 ? `${message.slice(0, 10)}...` : message;
  const makeInit = (init: number) => (user.rank < 0 ? '-' : init);
  return {
    intraId: user.intraId,
    rank: makeInit(user.rank),
    statusMessage: makeStatusMessage(user.statusMessage),
    point: !isRankModeType(user) ? user.exp : makeInit(user.ppp),
    level: !isRankModeType(user) ? user.level : null,
  };
}
