import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentData, TournamentGame } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { convertTournamentGamesToBracketMatchs } from 'utils/handleTournamentGame';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { clickedTournamentState } from 'utils/recoil/tournament';
import TournamentBraket from 'components/tournament/TournamentBraket';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const setError = useSetRecoilState(errorState);
  const sethighLightUser = useSetRecoilState(clickedTournamentState);
  const [waitTournament, setWaitTournament] = useState<TournamentData | null>(
    null
  );
  const [openTournamentId, setOpenTournamentId] = useState<number>(0);
  const [openTournament, setOpenTournament] = useState<Match[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null); // useRef를 사용하여 Ref 생성

  const openInfo = useQuery<TournamentData>(
    'openTorunamentInfo',
    () =>
      mockInstance.get('tournament?page=1&status=BEFORE').then((res) => {
        setOpenTournamentId(res.data.tournamentId);
        return res.data.tournamentId;
      }),
    { retry: 1, staleTime: 60000 /* 60초 */ }
  );

  const fetchWaitTournamentData = (page: number) => {
    return mockInstance
      .get(`tournament?page=${page}&status=BEFORE&size=4`)
      .then((res) => {
        return res.data;
      });
  };

  const fetchTournamentGames = useCallback(async () => {
    console.log('Fetching more data...');
    try {
      const res = await mockInstance.get(
        `/tournament/${openTournamentId}/games`
      );
      const data: TournamentGame[] = res.data.games;
      const bracketMatchs = convertTournamentGamesToBracketMatchs(data);
      setOpenTournament(bracketMatchs);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [openTournament]);

  useEffect(() => {
    fetchWaitTournamentData(1)
      .then((data) => {
        setWaitTournament(data);
      })
      .catch(() => {
        setError('JHH02');
      });
    fetchTournamentGames();
  }, []);

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
        <div className={styles.waitTournamentBox}>
          {waitTournament?.tournaments.map((tournament) => (
            <div className={styles.cardContainer} key={tournament.tournamentId}>
              <TournamentCard key={tournament.tournamentId} {...tournament} />
            </div>
          ))}
        </div>
        <div className={styles.tournamentTextOpen}> 진행중인 토너먼트 </div>
        <div
          className={styles.openTournamentBox}
          ref={containerRef}
          onClick={() => sethighLightUser('')}
        >
          {openInfo.data && openInfo.data.tournaments.length === 0 ? (
            <div className={styles.tournamentText}>
              진행중인 토너먼트가 없습니다
            </div>
          ) : (
            <TournamentBraket
              singleEliminationBracketMatchs={openTournament}
              containerSize={containerSize}
            />
          )}
        </div>
      </div>
    </div>
  );
}
