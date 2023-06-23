import React, { useState } from 'react';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListMain from './topRank/RankListMain';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';
import useRankList from 'hooks/rank/useRankList';
import { useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';

interface RankListProps {
  season?: number;
  isMain?: boolean;
}

export default function RankList({
  season,
  isMain,
}: RankListProps) {
  const Mode = useRecoilValue(colorToggleSelector);
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
    const seasonQuery = Mode === 'RANK' ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeQuery('RANK')}?page=1&size=3`
      : `/pingpong/${modeQuery(Mode)}?page=${page}&size=20${seasonQuery}`;
  };

  const makePathRanker = (): string => {
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'NORMAL' ? 'ranks/single' : 'exp';
    const seasonQuery = Mode === 'RANK' ? `&season=${season}` : '';
    return isMain
      ? `/pingpong/${modeQuery('RANK')}?page=1&size=3`
      : `/pingpong/${modeQuery(Mode)}?page=1&size=3${seasonQuery}`;
  };

  useRankList({
    makePath: makePath(),
    makePathRanker: makePathRanker(),
    toggleMode: Mode,
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
    <div>
      {ranker && <RankListMain rank={ranker} isMain={false} />}
      <RankListFrame pageInfo={pageInfo}>
        {rank?.rankList.map((item: NormalUser | RankUser, index) => (
          <RankListItem
            key={index}
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
    rank: user.rank,
    statusMessage: makeStatusMessage(user.statusMessage),
    point: !isRankModeType(user) ? user.exp : makeInit(user.ppp),
    level: !isRankModeType(user) ? user.level : null,
  };
}
