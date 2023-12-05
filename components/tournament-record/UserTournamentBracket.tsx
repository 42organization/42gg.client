import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useCallback, useEffect, useState, useRef } from 'react';
import { TournamentGame } from 'types/tournamentTypes';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import TournamentBraket from 'components/tournament/TournamentBraket';
import styles from 'styles/tournament-record/UserTournamentBracket.module.scss';

interface UserTournamentBracketProps {
  tournamentId: number | undefined;
}

export default function UserTournamentBraket({
  tournamentId,
}: UserTournamentBracketProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [bracketMatchs, setBracketMatchs] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const putHandler = async () => {
  //   await instanceInManage.put(
  //     `/pingpong/admin/tournaments/${tournamentId}}/games`,
  //     {
  //       games: tournament
  //     }
  //   );
  // };

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
          width={ref.current?.offsetWidth}
          height={ref.current?.offsetHeight}
        />
      )}
    </div>
  );
}
