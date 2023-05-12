import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Rank } from 'types/rankTypes';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
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
  const setError = useSetRecoilState(errorState);

  const getRankDataHandler = async () => {
    try {
      const res = await instance.get(`${makePath}`);
      setRank(res?.data);
      setMyRank((prev) => ({ ...prev, [toggleMode]: res?.data.myRank }));
    } catch (e) {
      setError('DK01');
    }
  };

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
