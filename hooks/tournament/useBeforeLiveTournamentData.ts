import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export default function useBeforeLiveTournamentData() {
  const setError = useSetRecoilState(errorState);
  const fetchTournamentData = useCallback(async () => {
    const beforeRes = await instance.get(
      '/pingpong/tournaments?page=1&status=BEFORE'
    );
    const liveRes = await instance.get(
      '/pingpong/tournaments?page=1&status=LIVE'
    );
    return {
      beforeTournament: beforeRes.data.tournaments,
      liveTournament: liveRes.data.tournaments,
    };
  }, []);

  const { data, isError } = useQuery<{
    beforeTournament: TournamentInfo[];
    liveTournament: TournamentInfo[];
  }>('beforeLiveTournamentData', fetchTournamentData, {
    retry: 1,
    staleTime: 60000,
  });

  if (isError) {
    setError('JC04');
  }

  return data;
}
