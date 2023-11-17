import Image from 'next/image';
import React, { useMemo, useCallback } from 'react';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { TournamentData } from 'types/tournamentTypes';
import { InfiniteScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/tournament-record/WinnerSwiper.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface WinnerSwiperProps {
  type: 'rookie' | 'master' | 'custom';
}

export default function WinnerSwiper(props: WinnerSwiperProps) {
  const fetchTournamentData = useCallback(
    async (page: number) => {
      console.log('Fetching more data...');
      const res = await mockInstance.get(
        `/tournament?page=${page}&type=${props.type}&size=5`
      );
      return res.data;
    },
    [props.type]
  );

  // TODO: error, isLoading 시 return 컴포넌트
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    InfiniteScroll<TournamentData>(
      'tournamentData',
      fetchTournamentData,
      'JC01'
    );

  const coverflowEffect = useMemo(
    () => ({
      rotate: 30,
      stretch: 0,
      depth: 500,
      slideShadows: true,
    }),
    []
  );

  const indexChangeHandler = useCallback(
    (swiper: SwiperClass) => {
      const slidesLength = swiper.slides.length;
      console.log('slide length: ' + slidesLength);
      if (hasNextPage && swiper.activeIndex >= slidesLength - 3) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  return (
    <Swiper
      className={styles.swiper}
      slidesPerView={2.6}
      effect={'coverflow'}
      centeredSlides={true}
      coverflowEffect={coverflowEffect}
      modules={[EffectCoverflow]}
      onActiveIndexChange={indexChangeHandler}
    >
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.tournaments.length > 0 &&
            page.tournaments.map((tournament) => (
              <SwiperSlide key={tournament.tournamentId}>
                <div className={styles.swiperSlide}>
                  <Image
                    src={tournament.winnerImageUrl}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    alt={tournament.winnerIntraId}
                    priority={true}
                  />
                </div>
              </SwiperSlide>
            ))}
        </React.Fragment>
      ))}
    </Swiper>
  );
}
