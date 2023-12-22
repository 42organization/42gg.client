import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/tournament/TournamentBraket';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/tournament/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
  fallbackText?: string;
}

export default function UserTournamentBraket({
  tournamentId,
  fallbackText,
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
        <LoadingSpinner />
      ) : tournamentId ? (
        <TournamentBraket
          singleEliminationBracketMatchs={bracketMatches}
          containerSize={size}
        />
      ) : (
        <div className={styles.noTournamentText}>{fallbackText}</div>
      )}
    </div>
  );
}
