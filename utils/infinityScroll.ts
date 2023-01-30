import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { errorState } from 'utils/recoil/error';
import instance from './axios';

export default function InfScroll(path: string) {
  const setError = useSetRecoilState(errorState);

  const getList = ({ pageParam = 0 }) =>
    instance.get(`${path}${pageParam}`, {}).then((res) => {
      return res?.data;
    });

  const result = useInfiniteQuery('infiniteList', getList, {
    getNextPageParam: (pages) => {
      return pages.lastGameId;
    },
    onError: (e: any) => {
      if (e.response.data.code === 'UF001') setError('JB07');
      else setError('KP01');
    },
    retry: 0,
    keepPreviousData: true,
  });

  return result;
}
