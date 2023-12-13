import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export default function useBeforeLiveTournamentData() {
  const setError = useSetRecoilState(errorState);
  const fetchTournamentData = useCallback(async () => {
    const liveRes = await instance.get(
      '/pingpong/tournaments?page=1&status=LIVE'
    );
    const beforeRes = await instance.get(
      '/pingpong/tournaments?page=1&status=BEFORE'
    );
    const combinedData = [
      ...liveRes.data.tournaments,
      ...beforeRes.data.tournaments,
    ];
    return combinedData;
  }, []);

  const { data, isError } = useQuery<TournamentInfo[]>(
    'beforeLiveTournamentData',
    fetchTournamentData,
    { retry: 1, staleTime: 60000 }
  );

  if (isError) {
    setError('JC04');
  }

  return data;
}
