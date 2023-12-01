import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TournamentData } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const setError = useSetRecoilState(errorState);
  const [waitTournament, setWaitTournament] = useState<TournamentData | null>(
    null
  );
  const openInfo = useQuery<TournamentData>(
    'openTorunamentInfo',
    () =>
      mockInstance
        .get('tournament?page=1&status=진행중')
        .then((res) => res.data),
    { retry: 1, staleTime: 60000 /* 60초 */ }
  );

  const fetchWaitTournamentData = (page: number) => {
    return mockInstance
      .get(`tournament?page=${page}&status=BEFORE&size=4`)
      .then((res) => {
        return res.data;
      });
  };

  useEffect(() => {
    fetchWaitTournamentData(1)
      .then((data) => {
        setWaitTournament(data);
      })
      .catch((error) => {
        setError('JHH02');
      });
  }, []);
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentTextWait}> 대기중인 토너먼트 </div>
        <div className={styles.waitTournamentBox}>
          {waitTournament?.tournaments.map((tournament) => (
            <div className={styles.cardContainer} key={tournament.tournamentId}>
              <TournamentCard key={tournament.tournamentId} {...tournament} />
            </div>
          ))}
        </div>
        <div className={styles.tournamentTextOpen}> 진행중인 토너먼트 </div>
        <div className={styles.openTournamentBox}>
          <div className={styles.tournamentText}>
            {openInfo.data && openInfo.data.tournaments.length === 0 ? (
              <>진행중인 토너먼트가 없습니다</>
            ) : (
              <>진행중인 토너먼트 사진</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
