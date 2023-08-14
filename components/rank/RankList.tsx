import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import RankListMain from './topRank/RankListMain';
import RankListFrame from './RankListFrame';
import RankListItem from './RankListItem';
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
    const modeQuery = (targetMode?: string) =>
      targetMode !== 'NORMAL' ? 'ranks/single' : 'exp';
    const seasonQuery = Mode === 'RANK' ? `&season=${season}` : '';
    return `/pingpong/${modeQuery(Mode)}?page=${page}&size=20${seasonQuery}`;
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
        {rank?.rankList.map((item: NormalUser | RankUser, index) => (
          <RankListItem key={index} user={makeUser(item)} />
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
    idColor: '#000000', // TODO : 랭크 정보에 아이디 색상 정보도 필요함.
    statusMessage: makeStatusMessage(user.statusMessage),
    point: !isRankModeType(user) ? user.exp : makeInit(user.ppp),
    level: !isRankModeType(user) ? user.level : null,
    tierImageUri: !isRankModeType(user) ? '' : user.tierImageUri,
  };
}
