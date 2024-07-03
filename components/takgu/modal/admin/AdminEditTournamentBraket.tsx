import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import { useCallback, useEffect, useState, useRef, createContext } from 'react';
import { ITournament } from 'types/admin/adminTournamentTypes';
import { TournamentGame } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import TournamentEditBraket from 'components/takgu/admin/tournament/TournamentEditBraket';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/admin/modal/AdminEditTournamentBraket.module.scss';

export const TournamentIdContext = createContext<number>(0);

export default function AdminEditTournamentBraket({
  tournamentId,
}: ITournament) {
  const [bracketMatchs, setBracketMatchs] = useState<Match[]>([]);
  const [ref, size] = useComponentSize<HTMLDivElement>();

  const fetchTournamentGames = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/tournaments/${tournamentId}/games`
      );
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
      <TournamentIdContext.Provider value={tournamentId}>
        <TournamentEditBraket
          singleEliminationBracketMatchs={bracketMatchs}
          containerSize={size}
        />
      </TournamentIdContext.Provider>
    </div>
  );
}
