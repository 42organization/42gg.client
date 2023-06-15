import React, { useState, createContext } from 'react';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListMain from './topRank/RankListMain';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';
import useRankList from 'hooks/rank/useRankList';
import { ToggleMode } from 'types/rankTypes';
interface RankListProps {
  toggleMode: ToggleMode;
  season?: number;
  isMain?: boolean;
}
export const ToggleModeContext = createContext<'RANK' | 'NORMAL'>('RANK');

export default function RankList({
  toggleMode,
  season,
  isMain,
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
      targetMode !== 'NORMAL' ? 'ranks/single' : 'exp';
    const seasonQuery = toggleMode === 'RANK' ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeQuery(toggleMode)}?page=1&size=3`
      : `/pingpong/${modeQuery(toggleMode)}?page=${page}&size=20${seasonQuery}`;
  };

  const makePathRanker = (): string => {
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'NORMAL' ? 'ranks/single' : 'exp';
    const seasonQuery = toggleMode === 'RANK' ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeQuery(toggleMode)}?page=1&size=3`
      : `/pingpong/${modeQuery(toggleMode)}?page=1&size=3${seasonQuery}`;
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

  if (isMain && ranker) {
    return <RankListMain rank={ranker} isMain={true} />;
  }

  return (
    <ToggleModeContext.Provider value={toggleMode}>
      <div>
        {ranker && <RankListMain rank={ranker} isMain={false} />}
        <RankListFrame toggleMode={toggleMode} pageInfo={pageInfo}>
          {rank?.rankList.map((item: NormalUser | RankUser, index) => (
            <RankListItem
              key={index}
              toggleMode={toggleMode}
              user={makeUser(item)}
            />
          ))}
        </RankListFrame>
      </div>
    </ToggleModeContext.Provider>
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
    rank: user.rank,
    statusMessage: makeStatusMessage(user.statusMessage),
    point: !isRankModeType(user) ? user.exp : makeInit(user.ppp),
    level: !isRankModeType(user) ? user.level : null,
  };
}
