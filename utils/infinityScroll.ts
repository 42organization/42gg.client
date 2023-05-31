import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { errorState } from 'utils/recoil/error';
import { instance } from './axios';
import { GameListData } from 'types/gameTypes';

export default function InfScroll(path: string) {
  const setError = useSetRecoilState(errorState);

  const getGameList = ({ pageParam = 1 }) =>
    instance.get(`${path}&page=${pageParam}`, {}).then((res) => {
      return res?.data;
    });

  return useInfiniteQuery<GameListData, Error>('infiniteList', getGameList, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.isLast ? undefined : allPages.length + 1;
    },
    onError: (e: any) => {
      if (e.response.data.code === 'UF001') setError('JB07');
      //else setError('KP01');
    },
    retry: 0,
    keepPreviousData: true,
  });
}
