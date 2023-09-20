import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { Rank, MyRank, ToggleMode } from 'types/rankTypes';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import useAxiosGet, { useMockAxiosGet } from 'hooks/useAxiosGet';
interface useRankListProps {
  makePath: string;
  toggleMode: ToggleMode;
  season: number | undefined;
  setRank: Dispatch<SetStateAction<Rank | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageInfo: {
    currentPage: number | undefined;
    totalPage: number | undefined;
    setPage: Dispatch<SetStateAction<number>>;
  };
}

const useRankList = ({
  makePath,
  toggleMode,
  season,
  setRank,
  page,
  setPage,
  pageInfo,
}: useRankListProps): void => {
  const [myRank, setMyRank] = useRecoilState<MyRank>(myRankState);
  const [isScroll, setIsScroll] = useRecoilState<boolean>(scrollState);

  const getRankDataHandler = useAxiosGet<any>({
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
          top: ((myRank[toggleMode] - 1) % 20) * 60,
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
