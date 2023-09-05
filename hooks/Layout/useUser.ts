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
      retry: 1,
    }
  );
  if (isError) {
    setError('JB02');
    return undefined;
  }
  if (data) return data;
  return undefined;
};
