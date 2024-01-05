import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { IoReloadSharp } from 'react-icons/io5';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/tournament/TournamentBraket';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/tournament-record/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
  state?: string | undefined;
}

export default function UserTournamentBraket({
  tournamentId,
  state,
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
      staleTime: 86400000, // 하루
    }
  );

  if (isError) {
    setError('JC03');
  }

  return (
    <div ref={ref} className={styles.bracketContainer}>
      {isLoading ? (
        <div className={styles.loadingAnimation} />
      ) : (
        <>
          {state === 'LIVE' && (
            <button
              onClick={() => refetch()}
              className={isFetching ? styles.refetching : ''}
            >
              <IoReloadSharp />
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
