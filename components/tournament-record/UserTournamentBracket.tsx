import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/tournament/TournamentBraket';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/tournament-record/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
}

export default function UserTournamentBraket({
  tournamentId,
}: UserTournamentBracketProps) {
  const setError = useSetRecoilState(errorState);
  const [ref, size] = useComponentSize<HTMLDivElement>();

  const fetchTournamentGames = async () => {
    const res = await mockInstance.get(`/tournament/${tournamentId}/games`);
    return convertTournamentGamesToBracketMatchs(res.data.games);
  };

  const {
    data: bracketMatches = [],
    isLoading,
    isError,
  } = useQuery<Match[]>(
    ['tournamentGames', tournamentId],
    () => fetchTournamentGames(),
    {
      enabled: !!tournamentId, // tournamentId가 undefined가 아닐 때만 작동하도록
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
        <TournamentBraket
          singleEliminationBracketMatchs={bracketMatches}
          containerSize={size}
        />
      )}
    </div>
  );
}
