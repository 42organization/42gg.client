import useAxiosGet from 'hooks/useAxiosGet';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { userImages } from 'types/rankTypes';
import { ToggleMode } from 'types/rankTypes';

interface useRankListProps {
  makePathRanker: string;
  toggleMode: ToggleMode;
  season: number | undefined;
  setRanker: Dispatch<SetStateAction<userImages[]>>;
  page: number;
}

const useRankListMain = ({
  makePathRanker,
  toggleMode,
  season,
  setRanker,
  page,
}: useRankListProps): void => {
  /*   const getRankerDataHandler = useAxiosGet<any>({
    url: makePathRanker,
    setState: (data) => {
      [data.userImages[0], data.userImages[1]] = [
        data.userImages[1],
        data.userImages[0],
      ];
      setRanker(data.userImages);
    },
    err: 'DK01',
    type: 'setError',
  }); */
  const getRankerDataHandler = useMockAxiosGet<any>({
    url: 'rank/user',
    setState: (data) => {
      [data.rankList[0], data.rankList[1]] = [
        data.rankList[1],
        data.rankList[0],
      ];
      setRanker(data.rankList);
    },
    err: 'DK01',
    type: 'setError',
  });

  useEffect(() => {
    getRankerDataHandler();
  }, [page, season, toggleMode]);
};

export default useRankListMain;
