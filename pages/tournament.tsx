import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentData, TournamentGame } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { errorState } from 'utils/recoil/error';
import TournamentBraket from 'components/tournament/TournamentBraket';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const setError = useSetRecoilState(errorState);
  const [openTournamentId, setOpenTournamentId] = useState<number | undefined>(
    undefined
  );
  const [openTournament, setOpenTournament] = useState<Match[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null); // useRef를 사용하여 Ref 생성

  const openInfo = useQuery<TournamentData>(
    'openTorunamentInfo',
    () =>
      instance
        .get('/pingpong/tournaments?size=20&page=1&status=LIVE')
        .then((res) => {
          if (res.data.tournamets?.length === 1) {
            console.log('openInfo');
            setOpenTournamentId(res.data.tournaments[0].tournamentId);
          }
          return res.data;
        }),
    {
      onError: (error) => {
        setError('JJH02');
      },
      retry: 1,
      staleTime: 60000 /* 60초 */,
    }
  );

  const waitInfo = useQuery<TournamentData>(
    'waitTournamentInfo',
    () =>
      instance
        .get(`/pingpong/tournaments?size=20&page=1&status=BEFORE`)
        .then((res) => {
          return res.data;
        }),
    {
      onError: (error) => {
        setError('JJH03');
      },
    }
  );

  const fetchTournamentGames = useCallback(async () => {
    console.log('Fetching more data...');
    try {
      const res = await instance.get(
        `pingpong/tournaments/${openTournamentId}/games`
      );
      const data: TournamentGame[] = res.data.games;
      const bracketMatchs = convertTournamentGamesToBracketMatchs(data);
      setOpenTournament(bracketMatchs);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [openTournamentId]);

  useEffect(() => {
    if (openTournamentId !== undefined) fetchTournamentGames();
  }, [openTournamentId, fetchTournamentGames]);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setContainerSize({ width, height });
    }
  }, []);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentText}> 예정된 토너먼트 </div>
        {waitInfo.data?.tournaments.length === 0 ? (
          <h4 className={styles.noTournamentText}>
            예정된 토너먼트가 없습니다.
          </h4>
        ) : (
          waitInfo.data?.tournaments.map((tournament) => (
            <div className={styles.cardContainer} key={tournament.tournamentId}>
              <TournamentCard key={tournament.tournamentId} {...tournament} />
            </div>
          ))
        )}
        <div className={styles.tournamentText}> 진행중인 토너먼트 </div>
        {openInfo.data && openInfo.data.tournaments?.length === 0 ? (
          <div className={styles.noTournamentText}>
            진행중인 토너먼트가 없습니다
          </div>
        ) : (
          <div className={styles.openTournamentBox} ref={containerRef}>
            <TournamentBraket
              singleEliminationBracketMatchs={openTournament}
              containerSize={containerSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}
