import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { InfiniteScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { InfiniteScrollComponent } from 'components/store/InfiniteScrollComponent';
import TournamentCard from 'components/tournament/TournamentCard';
import styles from 'styles/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const setError = useSetRecoilState(errorState);

  // const Info = useQuery<TournamentInfo>(
  //     'openTorunamentInfo',
  //     () =>
  //       mockInstance
  //         .get('tournaments?page=1&status=진행중')
  //         .then((res) => res.data),
  //     { retry: 1, staleTime: 60000 /* 60초 */ }
  // );

  function fetchWaitTournamentData(page: number) {
    return mockInstance
      .get(`tournaments?page=${page}&type=rookie&status=예정&size=4`)
      .then((res) => {
        return res.data;
      });
  }

  const { data, error, isLoading, hasNextPage, fetchNextPage } = InfiniteScroll(
    'waitTournament',
    fetchWaitTournamentData,
    'JY04'
  );

  // useEffect(() => {
  //   console.log(data?.pages);
  // }, [data]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Tournament</h1>
      <div className={styles.tournamentContainer}>
        <div className={styles.tournamentTextWait}> 대기중인 토너먼트 </div>
        <div className={styles.waitTournamentBox}>
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.tournaments.map(
                (tournament: TournamentInfo, tournamentIndex: number) => (
                  <TournamentCard key={tournamentIndex} {...tournament} />
                )
              )}
              {/* 실제로는 tournamnetId 를 key값으로 사용하는게 좋음, 현재는 mockdata에서 id 값들이 겹치기 때문에 Index로 사용
              {page.tournaments.map((tournament: TournamentInfo, tournamentIndex: number) => (
                <TournamentCard key={tournament.tournamentId} {...tournament} />
              ))} 
            */}
            </div>
          ))}
          <InfiniteScrollComponent
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
        <div className={styles.tournamentTextOpen}> 진행중인 토너먼트 </div>
        <div className={styles.openTournamentBox}>
          <div className={styles.tournamentText}> 무언가 토너먼트의 사진 </div>
        </div>
      </div>
    </div>
  );
}
