import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/tournament/TournamentBraket';
import TournamentCard from 'components/tournament/TournamentCard';
import useBeforeLiveTournamentData from 'hooks/tournament/useBeforeLiveTournamentData';
import useComponentSize from 'hooks/util/useComponentSize';
import styles from 'styles/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const setError = useSetRecoilState(errorState);
  const { data, isLoading } = useBeforeLiveTournamentData();
  const [ref, size] = useComponentSize<HTMLDivElement>();
  const [liveMatch, setLiveMatch] = useState<Match[]>();

  const fetchTournamentGames = useCallback(
    async (tournamentId: number) => {
      try {
        const res = await instance.get(
          `pingpong/tournaments/${tournamentId}/games`
        );
        setLiveMatch(convertTournamentGamesToBracketMatchs(res.data.games));
      } catch (error) {
        setError('JJH01');
      }
    },
    [setError]
  );

  useEffect(() => {
    if (data && data.liveTournament.length > 0) {
      fetchTournamentGames(data.liveTournament[0].tournamentId);
    }
  }, [data, fetchTournamentGames]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentText}> 예정된 토너먼트 </div>
        {data?.beforeTournament.length === 0 ? (
          <div className={styles.noTournamentText}>
            예정된 토너먼트가 없습니다.
          </div>
        ) : (
          <div className={styles.tournamentCardContainer}>
            {data?.beforeTournament.map((tournament) => (
              <div
                className={styles.cardContainer}
                key={tournament.tournamentId}
              >
                <TournamentCard
                  key={tournament.tournamentId}
                  {...tournament}
                  page='tournament'
                />
              </div>
            ))}
          </div>
        )}
        <div className={styles.tournamentText}> 진행중인 토너먼트 </div>
        {data?.liveTournament?.length === 0 ? (
          <div className={styles.noTournamentText}>
            진행중인 토너먼트가 없습니다
          </div>
        ) : (
          <>
            {data && (
              <TournamentCard
                {...data.liveTournament[0]}
                page='tournament/playing'
              />
            )}
            {liveMatch && (
              <div className={styles.openTournamentBox} ref={ref}>
                <TournamentBraket
                  singleEliminationBracketMatchs={liveMatch}
                  containerSize={size}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
