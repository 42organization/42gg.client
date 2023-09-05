import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import { NormalListItem } from 'components/rank/NormalListItem';
import RankListFrame from 'components/rank/RankListFrame';
import { RankListItem } from 'components/rank/RankListItem';
import RankListMain from 'components/rank/topRank/RankListMain';
import useRankList from 'hooks/rank/useRankList';

interface RankListProps {
  season?: number;
  isMain?: boolean;
}

export default function RankList({ season }: RankListProps) {
  const Mode = useRecoilValue(colorToggleSelector);
  const [rank, setRank] = useState<Rank>();
  const [page, setPage] = useState<number>(1);
  const pageInfo = {
    currentPage: rank?.currentPage,
    totalPage: rank?.totalPage,
    setPage,
  };
  const makePath = (): string => {
    const modeQuery = Mode === 'RANK' ? 'ranks/single' : 'exp';
    const seasonQuery = Mode === 'RANK' ? `&season=${season}` : '';
    return `pingpong/${modeQuery}?page=${page}&size=20${seasonQuery}`;
  };

  useRankList({
    makePath: makePath(),
    toggleMode: Mode,
    season: season,
    setRank: setRank,
    page: page,
    setPage: setPage,
    pageInfo: pageInfo,
  });

  return (
    <div>
      <RankListMain isMain={false} season={season} />
      <RankListFrame pageInfo={pageInfo}>
        {rank?.rankList.map((user: NormalUser | RankUser, index) =>
          isRankUser(user) ? (
            <RankListItem key={index} user={user} />
          ) : (
            <NormalListItem key={index} user={user} />
          )
        )}
      </RankListFrame>
    </div>
  );
}

function isRankUser(arg: RankUser | NormalUser): arg is RankUser {
  return 'ppp' in arg;
}
