import { useQuery } from 'react-query';
import { User } from 'types/agenda/mainType';
import { instanceInAgenda } from 'utils/axios';

export const useUser = () => {
  const { data, isError } = useQuery<User>(
    'agendauser',
    () =>
      instanceInAgenda.get('/profile/info').then((res) => {
        return res.data;
      }),
    {
      staleTime: 60 * 1000 * 10, // 10분 동안은 캐시를 사용
      retry: 1, // 에러가 났을 때 1번 재시도
    }
  );
  if (isError) {
    return undefined;
  }
  if (data) return data;
  return undefined;
};
