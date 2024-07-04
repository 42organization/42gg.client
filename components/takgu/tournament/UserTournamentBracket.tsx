import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/takgu/tournament/TournamentBraket';
import LoadingSpinner from 'components/takgu/UI/LoadingSpinner';
import useComponentSize from 'hooks/takgu/util/useComponentSize';
import styles from 'styles/takgu/tournament/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
  state?: string | undefined;
  queryStaleTime: number;
}

export default function UserTournamentBraket({
  tournamentId,
  state,
  queryStaleTime,
}: UserTournamentBracketProps) {
  const setError = useSetRecoilState(errorState);
  const [ref, size] = useComponentSize<HTMLDivElement>();

  const fetchTournamentGames = async () => {
    const res = await instance.get(
      `/pingpong/tournaments/${tournamentId}/games`
    );
    return convertTournamentGamesToBracketMatchs(res.data.games);
  };

  const {
    data: bracketMatches = [],
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useQuery<Match[]>(
    ['tournamentMatches', tournamentId],
    () => fetchTournamentGames(),
    {
      enabled: !!tournamentId, // tournamentId가 undefined가 아닐 때만 작동하도록
      staleTime: queryStaleTime,
    }
  );

  if (isError) {
    setError('JC03');
  }

  return (
    <div ref={ref} className={styles.bracketContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {state === 'LIVE' && (
            <button
              onClick={() => refetch()}
              className={isFetching ? styles.refetching : ''}
            >
              &#8635;
            </button>
          )}
          <TournamentBraket
            singleEliminationBracketMatchs={bracketMatches}
            containerSize={size}
          />
        </>
      )}
    </div>
  );
}
