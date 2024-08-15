import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export const useAgendaInfo = (agendaKey: string) => {
  const setError = useSetRecoilState<string>(errorState);
  const { data, isError } = useQuery<AgendaDataProps>(
    agendaKey,
    () =>
      instanceInAgenda.get('?agenda_key=' + agendaKey).then((res) => {
        res.data.agendaKey = agendaKey;
        return res.data;
      }),
    {
      staleTime: 60 * 1000 * 10, // 10분 동안은 캐시를 사용
      cacheTime: 60 * 1000 * 10, // 10분 동안 캐시를 유지
      retry: 1, // 에러가 났을 때 1번 재시도
      refetchOnMount: false, // 페이지 진입 시에는 새로고침을 하지 않음
    }
  );
  if (isError) {
    // setError('JB02');
    return undefined;
  }
  if (data) return data;
  return undefined;
};
