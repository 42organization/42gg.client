import useAxiosGet from 'hooks/useAxiosGet';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Rank } from 'types/rankTypes';
import { myRankState, scrollState } from 'utils/recoil/myRank';

type useRankListProps = [
  string,
  MatchMode,
  number | undefined,
  Dispatch<SetStateAction<Rank | undefined>>,
  number,
  Dispatch<SetStateAction<number>>,
  {
    currentPage: number | undefined;
    totalPage: number | undefined;
    setPage: Dispatch<SetStateAction<number>>;
  }
];

const useRankList = ([
  makePath,
  toggleMode,
  season,
  setRank,
  page,
  setPage,
  pageInfo,
]: useRankListProps): void => {
  const [myRank, setMyRank] = useRecoilState(myRankState);
  const [isScroll, setIsScroll] = useRecoilState(scrollState);

  const getRankDataHandler = useAxiosGet({
    url: makePath,
    setState: (data) => {
      setRank(data);
      setMyRank((prev) => ({ ...prev, [toggleMode]: data.myRank }));
    },
    err: 'DK01',
    type: 'setError',
  });

  useEffect(() => {
    async function waitRankList() {
      await getRankDataHandler();
    }

    waitRankList().then(() => {
      if (isScroll) {
        window.scrollTo({
          top: ((myRank[toggleMode] - 1) % 20) * 45,
          behavior: 'smooth',
        });
        setIsScroll(false);
      }
    });
  }, [page, isScroll]);

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
};

export default useRankList;
