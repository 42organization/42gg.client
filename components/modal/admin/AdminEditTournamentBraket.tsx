import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useCallback, useEffect, useState, useRef } from 'react';
import { ITournament } from 'types/admin/adminTournamentTypes';
import { TournamentGame } from 'types/tournamentTypes';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import TournamentBraket from 'components/tournament/TournamentBraket';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/admin/modal/AdminEditTournamentBraket.module.scss';

const tournamentId = 1;

export default function AdminEditTournamentBraket({
  tournamentId,
}: ITournament) {
  const [bracketMatchs, setBracketMatchs] = useState<Match[]>([]);
  const [ref, size] = useComponentSize<HTMLDivElement>();

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
    <div className={styles['whole']} ref={ref}>
      <TournamentBraket
        singleEliminationBracketMatchs={bracketMatchs}
        containerSize={size}
      />
      <button className={styles.editBtn}>수정 하기</button>
    </div>
  ); //*onClick={putHandler}
}
