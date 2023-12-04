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
      const data: TournamentGame[] = res.data.games;
      const bracketMatchs = convertTournamentGamesToBracketMatchs(data);
      setBracketMatchs(bracketMatchs);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchTournamentGames();
  }, [fetchTournamentGames]);

  return (
    <div ref={ref} className={styles.bracketContainer}>
      <TournamentBraket
        singleEliminationBracketMatchs={bracketMatchs}
        width={ref.current?.offsetWidth}
        height={ref.current?.offsetHeight}
      />
    </div>
  );
}
