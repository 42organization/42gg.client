import { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { myRankState, pageState } from 'utils/recoil/myRank';
import { seasonListState } from 'utils/recoil/seasons';
import { errorState } from 'utils/recoil/error';
import { userState } from 'utils/recoil/layout';
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
  const myIntraId = useRecoilValue(userState).intraId;
  const setError = useSetRecoilState(errorState);
  const myRankRef = useRef<HTMLDivElement>(null);
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
    getRankHandler();
  }, [page]);

  useEffect(() => {
    if (!myRank.clicked) return;
    async function waitRankList() {
      await getRankHandler();
    }
    waitRankList().then(() => {
      myRankRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setMyRank((prev) => ({ ...prev, clicked: false }));
    });
  }, [myRank.clicked]);

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
        <div key={index} ref={item.intraId === myIntraId ? myRankRef : null}>
          <RankListItem
            index={index}
            toggleMode={toggleMode}
            user={makeUser(item)}
          />
        </div>
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
