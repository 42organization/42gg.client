import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { User } from 'types/mainType';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export const useUser = () => {
  const setError = useSetRecoilState<string>(errorState);
  const { data, isError } = useQuery<User>(
    'user',
    () => instance.get('/pingpong/users').then((res) => res.data),
    {
      staleTime: 60 * 1000 * 10, // 10분 동안은 캐시를 사용
      retry: 1, // 에러가 났을 때 1번 재시도
    }
  );
  if (isError) {
    setError('JB02');
    return undefined;
  }
  if (data) return data;
  return undefined;
};
