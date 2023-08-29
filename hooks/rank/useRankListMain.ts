import { useEffect, Dispatch, SetStateAction } from 'react';
import { userImages, ToggleMode } from 'types/rankTypes';
import useAxiosGet, { useMockAxiosGet } from 'hooks/useAxiosGet';

interface useRankListProps {
  makePathRanker: string;
  toggleMode: ToggleMode;
  season: number | undefined;
  setRanker: Dispatch<SetStateAction<userImages[]>>;
  page: number;
  isMain: boolean;
}

const useRankListMain = ({
  makePathRanker,
  toggleMode,
  season,
  setRanker,
  page,
  isMain,
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
    url: makePathRanker,
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
  }, [page, season, toggleMode, isMain]);
};

export default useRankListMain;
