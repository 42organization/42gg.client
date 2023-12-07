import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useCallback, useEffect, useState, useRef } from 'react';
import { TournamentGame } from 'types/tournamentTypes';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import TournamentBraket from 'components/tournament/TournamentBraket';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/tournament-record/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
}

export default function UserTournamentBraket({
  tournamentId,
}: UserTournamentBracketProps) {
  const [ref, size] = useComponentSize<HTMLDivElement>();

  const [bracketMatchs, setBracketMatchs] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTournamentGames = useCallback(async () => {
    console.log('Fetching more data...');
    try {
      const res = await mockInstance.get(`/tournament/${tournamentId}/games`);
      setIsLoading(false);
      const data: TournamentGame[] = res.data.games;
      const bracketMatchs = convertTournamentGamesToBracketMatchs(data);
      setBracketMatchs(bracketMatchs);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, [tournamentId]);

  useEffect(() => {
    setIsLoading(true);
    const identifier = setTimeout(() => {
      console.log('fetching tournament game data..');
      fetchTournamentGames();
    }, 500);
    return () => clearTimeout(identifier);
  }, [tournamentId, fetchTournamentGames]);

  return (
    <div ref={ref} className={styles.bracketContainer}>
      {isLoading ? (
        <div className={styles.loadingAnimation} />
      ) : (
        <TournamentBraket
          singleEliminationBracketMatchs={bracketMatchs}
          containerSize={size}
        />
      )}
    </div>
  );
}
