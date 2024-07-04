import { useState, useRef, useEffect, useCallback } from 'react';
import { SwiperClass, SwiperRef } from 'swiper/react';
import { TournamentInfo, TournamentData } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { InfiniteScroll } from 'utils/infinityScroll';
import UserTournamentBracket from 'components/takgu/tournament/UserTournamentBracket';
import LeagueButtonGroup from 'components/takgu/tournament-record/LeagueButtonGroup';
import WinnerSwiper from 'components/takgu/tournament-record/WinnerSwiper';
import WinnerTournamentInfo from 'components/takgu/tournament-record/WinnerTournamentInfo';
import LoadingSpinner from 'components/takgu/UI/LoadingSpinner';
import styles from 'styles/takgu/tournament-record/TournamentRecord.module.scss';

export default function TournamentRecord() {
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>();
  const [selectedType, setSelectedType] = useState<string>('ROOKIE');
  const swiperRef = useRef<SwiperRef>(null);

  const fetchTournamentData = useCallback(
    async (page: number) => {
      const res = await instance.get(
        `pingpong/tournaments?page=${page}&type=${selectedType}&size=5&status=END`
      );
      return res.data;
    },
    [selectedType]
  );

  const { data, hasNextPage, fetchNextPage, isLoading } =
    InfiniteScroll<TournamentData>(
      ['tournamentData', selectedType],
      fetchTournamentData,
      'JC01'
    );

  const indexChangeHandler = useCallback(
    (swiper: SwiperClass) => {
      const slidesLength = swiper.slides.length;
      if (hasNextPage && swiper.activeIndex >= slidesLength - 3) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current?.swiper.slideTo(0, 0); // 이동할 슬라이드 인덱스, 이동 속도
    }
  }, [selectedType]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Hall of Fame</h1>
      <LeagueButtonGroup onSelect={setSelectedType} />
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <WinnerSwiper
            tournamentData={data}
            type={selectedType}
            size={5}
            setTournamentInfo={setTournamentInfo}
            onIndexChange={indexChangeHandler}
            ref={swiperRef}
          />
          {data?.pages[0].totalPage === 0 ? (
            <p>종료된 토너먼트가 없습니다!</p>
          ) : (
            <>
              <WinnerTournamentInfo tournamentInfo={tournamentInfo} />
              <UserTournamentBracket
                tournamentId={tournamentInfo?.tournamentId}
                queryStaleTime={1000 * 60 * 60}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
