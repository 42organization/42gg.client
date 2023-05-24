import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { errorState } from 'utils/recoil/error';
import { instance } from './axios';

export default function InfScroll(path: string) {
  console.log(path);
  const setError = useSetRecoilState(errorState);

  const getGameList = ({ pageParam = 0 }) =>
    instance.get(`${path}&page=${pageParam}`, {}).then((res) => {
      return res?.data;
    });

  return useInfiniteQuery('infiniteList', getGameList, {
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
    onError: (e: any) => {
      if (e.response.data.code === 'UF001') setError('JB07');
      else setError('KP01');
    },
    retry: 0,
    keepPreviousData: true,
  });
}
