import { useMemo, useState } from 'react';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListMain from './topRank/RankListMain';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';
import useRankList from 'hooks/rank/useRankList';

interface RankListProps {
  toggleMode: 'normal' | 'rank';
  season?: number;
  isMain?: boolean;
}
export default function RankList({
  toggleMode,
  season,
  isMain = false,
}: RankListProps) {
  const [rank, setRank] = useState<Rank>();
  const [ranker, setRanker] = useState<Rank>();
  const [page, setPage] = useState<number>(1);
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
    setPage,
  };
  const makePath = (): string => {
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'normal' ? 'ranks/single' : 'exp';
    const seasonQuery = toggleMode === 'rank' ? `&season=${season}` : '';
    return `/pingpong/${modeQuery(
      toggleMode
    )}?page=${page}&size=20${seasonQuery}`;
  };

  const makePathRanker = (): string => {
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'normal' ? 'ranks/single' : 'exp';
    //const seasonQuery = toggleMode === 'rank' ? `&season=${season}` : '';
    //return `/pingpong/${modeQuery(toggleMode)}?page=1&size=3${seasonQuery}`;
    return `/pingpong/${modeQuery(toggleMode)}?page=1&size=3`;
  };

  useRankList({
    makePath: makePath(),
    makePathRanker: makePathRanker(),
    toggleMode: toggleMode,
    season: season,
    setRank: setRank,
    setRanker: setRanker,
    page: page,
    setPage: setPage,
    pageInfo: pageInfo,
  });

  useMemo(() => {
    console.log('123', ranker);
    const temp = ranker?.rankList[1];
    ranker?.rankList.splice(1, 1);
    ranker?.rankList.unshift(temp); //타입 에러
  }, [ranker]);

  if (isMain) {
    return <RankListMain rank={ranker} />;
  }

  return (
    <div>
      <RankListMain rank={ranker} />
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
    </div>
  );
}

function isRankModeType(arg: RankUser | NormalUser): arg is RankUser {
  return 'ppp' in arg;
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
