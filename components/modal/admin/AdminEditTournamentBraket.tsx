import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useCallback, useEffect, useState } from 'react';
import { ITournament } from 'types/admin/adminTournamentTypes';
import { TournamentGame, TournamentInfo } from 'types/tournamentTypes';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import TournamentBraket from 'components/tournament/TournamentBraket';
import styles from 'styles/admin/modal/AdminEditTournamentBraket.module.scss';

export default function AdminEditTournamentBraket({
  tournamentId,
}: ITournament) {
  const [bracketMatchs, setBracketMatchs] = useState<Match[]>([]);

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
    <div className={styles['whole']}>
      <TournamentBraket singleEliminationBracketMatchs={bracketMatchs} />
    </div>
  );
}
